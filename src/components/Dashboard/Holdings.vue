<template>
  <v-card
    elevation="1"
    outlined
    min-width="350"
    max-width="500"
  >
    <v-row class="py-0 px-2">
      <v-col
        cols="10"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="text-h6 text-left"
              @click="test"
            >
              Holdings
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <!-- <v-col
        cols="2"
        class="d-flex align-center pt-0 justify-end"
      >
        <v-icon class="float-right">
          mdi-reload
        </v-icon>
      </v-col> -->
    </v-row>
    <v-divider />
    <v-row class="py-4">
      <v-col class="d-flex justify-center">
        <div :style="pieChart">
          <HoldingsPieChart
            :equities="equitiesVal"
            :cash="cash"
            :options="optionsVal"
            data-cy="pie-chart"
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-spacer />
      <v-col
        cols="3"
        sm="3"
        md="3"
      >
        Equities
      </v-col>
      <v-col
        cols="6"
        sm="3"
        md="3"
      >
        Cash
      </v-col>
      <v-col
        cols="3"
        sm="3"
        md="3"
      >
        Options
      </v-col>
      <v-spacer />
    </v-row>
    <v-row class="mb-5">
      <v-spacer />
      <v-col
        cols="3"
        sm="3"
        md="3"
        class="pa-0"
      >
        <div
          class="text-h5 blue--text text--darken-2"
          data-cy="holdings-equities-value"
        >
          {{ equities }}
        </div>
      </v-col>
      <v-col
        cols="6"
        sm="3"
        md="3 "
        class="pa-0"
      >
        <div
          class="text-h6 green--text text--darken-3 pr-0 mr-0"
          data-cy="holdings-cash-value"
        >
          ${{ cash }}
        </div>
      </v-col>
      <v-col
        cols="3"
        sm="3"
        md="3"
        class="pa-0"
      >
        <div
          class="text-h5 black--text"
          data-cy="holdings-options-value"
        >
          {{ options }}
        </div>
      </v-col>
      <v-spacer />
    </v-row>
    <!-- <v-row>
      <v-col
        cols="6"
        class="d-flex align-center pl-10"
        data-cy="holdings-last-7-days"
      >
        <p class="text-subtitle-2 align-center ma-0">
          Last 7 days
        </p>
        <v-icon>arrow_right</v-icon>
      </v-col>
      <v-col
        cols="6"
        class="d-flex align-center pr-10"
        data-cy="holdings-breakdown"
      >
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-title class="text-subtitle-2 text-right">
              Breakdown
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-icon>arrow_right</v-icon>
      </v-col>
    </v-row> -->
  </v-card>
</template>

<script>
import HoldingsPieChart from './HoldingsPieChart.vue'

export default {
  name: 'HoldingsComponent',
  components: {
    HoldingsPieChart
  },
  props: {
    holdingsData: {
      type: Object,
      default () {
        return { sumCash: 0, sumEquity: 0, numEquity: 0, sumOption: 0, numOption: 0 }
      }
    }
  },
  data () {
    return {
      // equities: this.holdingsData.numEquity,
      // cash: this.holdingsData.sumCash,
      // options: this.holdingsData.numOption,
      pieChart: {
        width: '50%'
      }
    }
  },
  // <HoldingsPieChart
  //           :equities="holdingsData.sumEquity"
  //           :cash="holdingsData.sumCash"
  //           :options="holdingsData.sumOption"
  //           data-cy="pie-chart"
  //         />
  computed: {
    equities () {
      return this.holdingsData.numEquity
    },
    cash () {
      return Math.floor(this.holdingsData.sumCash)
    },
    cashDecimal () {
      return (parseFloat(this.holdingsData.sumCash - this.cash).toFixed(2)).toString().slice(-3)
    },
    options () {
      return this.holdingsData.numOption
    },
    equitiesVal () {
      console.log('equitiesVal ' + this.holdingsData.sumEquity)
      return this.holdingsData.sumEquity
    },
    optionsVal () {
      console.log('optionsVal ' + this.holdingsData.sumOption)
      return this.holdingsData.sumOption
    }
  },
  methods: {
    test () {
      console.log(this.holdingsData)
      console.log(this.holdingsData.sumCash)
      console.log(this.holdingsData.sumEquity)
      console.log(this.holdingsData.sumOption)
      console.log('===')
      console.log(this.equities)
      console.log(this.cash)
      console.log(this.options)
      console.log('---')
      console.log(this.equitiesVal)
      console.log(this.optionsVal)
    }
  }
}
</script>
