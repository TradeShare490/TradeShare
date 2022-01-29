<template>
<v-card v-if="stocks.length > 0" min-width="350" data-cy="positions">
  <v-data-table
    :headers="headers"
    :items="stocks"
    sort-by="date"
    class="elevation-1"
    mobile-breakpoint="700"
  >
    <template v-slot:top>
      <v-snackbar data-cy="positions-snackbar" v-model="snackbar" :snackbarTimeout="snackbarTimeout" :color="snackbarColor">
        {{snackbarText}}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
      <v-toolbar flat>
        <v-toolbar-title>Your Positions</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="650px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              data-cy="positions-new-item-btn"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedStock.symbol"
                      data-cy="positions-new-item-symbol-tf"
                      label="Symbol"
                      :error="symbolError"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedStock.qty"
                      label="Position Size"
                      data-cy="positions-new-item-position-size-tf"
                      :error="positionError"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="date"
                      label="Execution Date"
                      :error="dateError"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedStock.unrealized_plpc"
                      label="P/L"
                      data-cy="positions-new-item-pl-tf"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedStock.verified"
                      :items="[true, false]"
                      label="Verified"
                      return-object
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close" data-cy="positions-new-item-cancel-btn">
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
                data-cy="positions-new-item-submit-btn"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px" data-cy="delete-dialogue">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete" data-cy="cancel-stock-delete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteStockConfirm" data-cy="confirm-stock-delete"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.verified`]="{ item }">
      <v-chip
        label
        class="text-uppercase white--text px-3"
        :color="item.verified ? 'green' : 'blue'"
        >{{ item.verified ? "VERIFIED" : "MANUAL" }}</v-chip
      >
    </template>
    <template v-slot:[`item.unrealized_plpc`]="{ item }">
      <v-card min-width="80" flat>
        <v-icon
          x-small
          left
          :color="item.unrealized_plpc > 0 ? 'green' : 'red'"
        >
          mdi-circle
        </v-icon>
        {{ getDisplayNumber(Number(item.unrealized_plpc)) }}%
      </v-card>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editStock(item)" data-cy="edit-stock-button">
        mdi-pencil
      </v-icon>
      <v-icon small class="mr-2" @click="deleteStock(item)" data-cy="delete-stock-button">
        mdi-delete
      </v-icon>
      <v-icon small data-cy="share-stock-button">
        mdi-share
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
  </v-card>
<v-card v-else min-width="350" data-cy="positions">
  User has no active positions
</v-card>
</template>

<script>
import UserService from "../../services/User.service";
export default {
  name: "Positions",
  props: {
    userId: String
  },
  data() {
    return {
      verified: true,
      date: new Date(),
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Symbol",
          align: "start",
          value: "symbol",
        },
        { text: "Position Size", value: "qty" },
        { text: "Execution Date", value: "date" },
        { text: "P/L", value: "unrealized_plpc" },
        { text: "Verified", value: "verified" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      stocks: [],
      editedIndex: -1,
      editedStock: {
        symbol: "",
        qty: 0,
        date: new Date().toLocaleString('en-US'),
        unrealized_plpc: 0,
        verified: false,
      },
      defaultStock: {
        symbol: "",
        qty: 0,
        date: new Date().toLocaleString('en-US'),
        unrealized_plpc: 0,
        verified: false,
      },
      snackbar: false,
      snackbarText: "",
      snackbarColor: "primary",
      snackbarTimeout: 3000,
      symbolError: false,
      positionError: false,
      dateError: false,
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      try {
        this.stocks = await UserService.getPositions(this.userId);
      } catch (err) {
        console.log(err);
      }
    },

    editStock(stock) {
      this.editedIndex = this.stocks.indexOf(stock);
      this.editedStock = Object.assign({}, stock);
      this.dialog = true;
    },

    deleteStock(stock) {
      this.editedIndex = this.stocks.indexOf(stock);
      this.editedStock = Object.assign({}, stock);
      this.dialogDelete = true;
    },

    deleteStockConfirm() {
      this.stocks.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedStock = Object.assign({}, this.defaultStock);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedStock = Object.assign({}, this.defaultStock);
        this.editedIndex = -1;
      });
    },

        save () {
          this.symbolError = this.positionError = this.dateError = false;
          let err = false;
          if (this.editedStock.symbol.trim() == "") {
            this.symbolError = true; err = true;
          }
          if (this.editedStock.positionSize <= 0 && !isNaN(this.editedStock.positionSize)){
            this.positionError = true; err = true;
          }
          if (!Date.parse(this.editedStock.date)) {
            this.dateError = true; err = true;
          }
          if (err) {
            this.snackbarText = "Invalid input. Please try again.";
            this.snackbarColor = "error";
            this.snackbar = true;
            return;
          }
          if (this.editedIndex > -1) {
              Object.assign(this.stocks[this.editedIndex], this.editedStock)
          } else {
              this.stocks.push(this.editedStock)
          }
          this.snackbarText = "Position added";
          this.snackbarColor = "primary";
          this.snackbar = true;
          this.close()
        },

    getDisplayNumber(number) {
      if (Math.abs(number) >= 0 && Math.abs(number) < 10) {
        return number.toFixed(3);
      } else if (Math.abs(number) >= 10 && Math.abs(number) < 100) {
        return number.toFixed(2);
      } else if (Math.abs(number) >= 100 && Math.abs(number) < 1000) {
        return number.toFixed(1);
      } else {
        return number.toFixed(0);
      }
    },
  },
};
</script>
