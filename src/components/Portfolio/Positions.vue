<template>
  <v-data-table
    :headers="headers"
    :items="stocks"
    sort-by="date"
    class="elevation-1"
    mobile-breakpoint="700"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Your Positions</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" data-cy="positions-new-item-btn">
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
                      label="Symbol" data-cy="positions-new-item-symbol-tf"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedStock.positionSize"
                      label="Position Size" data-cy="positions-new-item-position-size-tf"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedStock.date"
                      label="Execution Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedStock.profitLoss"
                      label="P/L" data-cy="positions-new-item-pl-tf"
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
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save" data-cy="positions-new-item-submit-btn" >
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
              <v-btn color="blue darken-1" text @click="deleteStockConfirm"
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
        >{{ item.verified ? "VERIFIED" : "MANUAL" }}</v-chip>  
    </template>
    <template v-slot:[`item.profitLoss`]="{ item }">
        <v-card min-width='80' flat>
          <v-icon x-small left :color="item.profitLoss > 0 ? 'green' : 'red'">
            mdi-circle
          </v-icon>
          {{ getDisplayNumber(Number(item.profitLoss)) }}%
        </v-card>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editStock(item)">
        mdi-pencil
      </v-icon>
      <v-icon small class="mr-2" @click="deleteStock(item)">
        mdi-delete
      </v-icon>
      <v-icon small @click="shareStock(item)">
        mdi-share
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
            editedStock: {
                symbol: '',
                positionSize: 0,
                date: new Date(),
                profitLoss: 0,
                verified: false,
            },
            defaultStock: {
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

        editStock (stock) {
        this.editedIndex = this.stocks.indexOf(stock)
        this.editedStock = Object.assign({}, stock)
        this.dialog = true
        },

        deleteStock (stock) {
        this.editedIndex = this.stocks.indexOf(stock)
        this.editedStock = Object.assign({}, stock)
        this.dialogDelete = true
        },

        deleteStockConfirm () {
        this.stocks.splice(this.editedIndex, 1)
        this.closeDelete()
        },

        close () {
        this.dialog = false
        this.$nextTick(() => {
            this.editedStock = Object.assign({}, this.defaultStock)
            this.editedIndex = -1
        })
        },

        closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
            this.editedStock = Object.assign({}, this.defaultStock)
            this.editedIndex = -1
        })
        },

        save () {
        if (this.editedIndex > -1) {
            Object.assign(this.stocks[this.editedIndex], this.editedStock)
        } else {
            this.stocks.push(this.editedStock)
        }
        this.close()
        },

        getDisplayNumber(number) {
          if(Math.abs(number) >= 0 && Math.abs(number) < 10) {
            return number.toFixed(3)
          } else if(Math.abs(number) >= 10 && Math.abs(number) < 100) {
            return number.toFixed(2)
          } else if(Math.abs(number) >= 100 && Math.abs(number) < 1000) {
            return number.toFixed(1)
          } else {
            return number.toFixed(0)
          }
        }
    },
};
</script>
