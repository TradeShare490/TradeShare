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
            >
              Holdings
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
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
          class="text-h6 blue--text text--darken-4"
          data-cy="holdings-equities-value"
        >
          ${{ Math.floor(equitiesVal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
        </div>
      </v-col>
      <v-col
        cols="6"
        sm="3"
        md="3 "
        class="pa-0"
      >
        <div
          class="text-h6 green--text text--darken-1 pr-0 mr-0"
          data-cy="holdings-cash-value"
        >
          ${{ cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
        </div>
      </v-col>
      <v-col
        cols="3"
        sm="3"
        md="3"
        class="pa-0"
      >
        <div
          class="text-h5 orange--text text--darken-3"
          data-cy="holdings-options-value"
        >
          {{ options }}
        </div>
      </v-col>
      <v-spacer />
    </v-row>
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
      /* istanbul ignore next */
      default () {
        return { sumCash: 0, sumEquity: 0, numEquity: 0, sumOption: 0, numOption: 0 }
      }
    }
  },
  data () {
    return {
      pieChart: {
        width: '50%'
      }
    }
  },
  computed: {
    /* istanbul ignore next */
    equities () {
      return this.holdingsData.numEquity
    },
    cash () {
      return Math.floor(this.holdingsData.sumCash)
    },
    /* istanbul ignore next */
    cashDecimal () {
      return (parseFloat(this.holdingsData.sumCash - this.cash).toFixed(2)).toString().slice(-3)
    },
    options () {
      return this.holdingsData.numOption
    },
    equitiesVal () {
      return this.holdingsData.sumEquity
    },
    optionsVal () {
      return this.holdingsData.sumOption
    }
  }
}
</script>
