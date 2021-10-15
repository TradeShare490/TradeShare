<template>
  <v-data-table
    :headers="headers"
    :items="stocks"
    sort-by="date"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Your Positions</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
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
                      v-model="editedItem.symbol"
                      label="Symbol"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.positionSize"
                      label="Position Size"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.date"
                      label="Execution Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.profitLoss"
                      label="P/L"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.verified"
                      label=""
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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
            label="Verified"
            class="text-uppercase white--text px-1"
            :color="item.verified ? 'green' : 'blue'"
        >{{ item.verified ? "VERIFIED" : "MANUAL" }}</v-chip>  
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
    name: "Positions",
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'Symbol',
                    align: 'start',
                    value: 'symbol',
                },
                { text: 'Position Size', value: 'positionSize' },
                { text: 'Execution Date', value: 'date'},
                { text: 'P/L', value: 'profitLoss' },
                { text: 'Verified', value: 'verified' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            stocks: [],
            editedIndex: -1,
            editedItem: {
                symbol: '',
                positionSize: 0,
                date: new Date(),
                profitLoss: 0,
                verified: false,
            },
            defaultItem: {
                symbol: '',
                positionSize: 0,
                date: new Date(),
                profitLoss: 0,
                verified: false,
            }
        };
    },
    computed: {
        formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog (val) {
        val || this.close()
        },
        dialogDelete (val) {
        val || this.closeDelete()
        },
    },

    created () {
        this.initialize()
    },

    methods: {
        initialize () {
            this.stocks = [
                {
                    symbol: 'MSFT',
                    positionSize: 1000,
                    date: new Date().toLocaleString(),
                    profitLoss: 21.33,
                    verified: true,
                },
                {
                    symbol: 'AAPL',
                    positionSize: 25,
                    date: new Date("10/12/2021").toLocaleString(),
                    profitLoss: -3.76,
                    verified: false,
                },
                {
                    symbol: 'FSR',
                    positionSize: 240,
                    date: new Date("10/13/2021").toLocaleString(),
                    profitLoss: 67.30,
                    verified: true,
                },
                
            ]
        },

        editItem (item) {
        this.editedIndex = this.stocks.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        },

        deleteItem (item) {
        this.editedIndex = this.stocks.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        },

        deleteItemConfirm () {
        this.stocks.splice(this.editedIndex, 1)
        this.closeDelete()
        },

        close () {
        this.dialog = false
        this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        })
        },

        closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        })
        },

        save () {
        if (this.editedIndex > -1) {
            Object.assign(this.stocks[this.editedIndex], this.editedItem)
        } else {
            this.stocks.push(this.editedItem)
        }
        this.close()
        },
    },
};
</script>
