<template>
  <v-card
    v-if="stocks.length > 0"
    min-width="350"
    data-cy="positions"
  >
    <v-data-table
      :headers="headers"
      :items="stocks"
      sort-by="date"
      class="elevation-1"
      mobile-breakpoint="700"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Your Positions</v-toolbar-title>
        </v-toolbar>
      </template>
      <template #[`item.market_value`]="{ item }">
        {{ Number(item.market_value).toFixed(2) }}
      </template>
      <template #[`item.cost_basis`]="{ item }">
        {{ Number(item.cost_basis).toFixed(2) }}
      </template>
      <template #[`item.lastday_price`]="{ item }">
        {{ Number(item.lastday_price).toFixed(2) }}
      </template>
      <template #[`item.unrealized_plpc`]="{ item }">
        <v-card
          min-width="80"
          flat
        >
          <v-icon
            x-small
            left
            :color="item.unrealized_plpc > 0 ? 'green' : 'red'"
          >
            mdi-circle
          </v-icon>
          {{ getDisplayNumber(Number(item.unrealized_plpc*100)) }}%
        </v-card>
      </template>
    </v-data-table>
  </v-card>
  <v-card
    v-else
    min-width="350"
    data-cy="positions"
  >
    User has no active positions
  </v-card>
</template>

<script>
import UserService from '../../services/User.service'
export default {
  name: 'PositionsData',
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Symbol',
          align: 'start',
          value: 'symbol'
        },
        { text: 'Position Size', value: 'qty' },
        { text: 'Market Value', value: 'market_value' },
        { text: 'Cost Basis', value: 'cost_basis' },
        { text: 'Last Traded Price', value: 'lastday_price' },
        { text: 'P/L', value: 'unrealized_plpc' }
      ],
      stocks: []
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    async initialize () {
      try {
        this.stocks = await UserService.getPositions(this.userId)
      } catch (err) {
        console.log(err)
      }
    },

    getDisplayNumber (number) {
      if (Math.abs(number) >= 0 && Math.abs(number) < 10) {
        return number.toFixed(3)
      } else if (Math.abs(number) >= 10 && Math.abs(number) < 100) {
        return number.toFixed(2)
      } else if (Math.abs(number) >= 100 && Math.abs(number) < 1000) {
        return number.toFixed(1)
      } else {
        return number.toFixed(0)
      }
    }
  }
}
</script>
