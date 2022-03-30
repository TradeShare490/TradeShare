<template>
  <v-container
    class="ma-0"
    fluid
  >
    <v-row>
      <v-col
        sm="6"
        lg="3"
        xl="3"
        data-cy="portfolio-value-card"
      >
        <PortfolioAnalyticsTemplate
          title="Portfolio Value"
          :value="'$'+ account.buying_power"
          :percent-change="-20"
          icon="mdi-domain"
        />
      </v-col>
      <v-col
        sm="6"
        lg="3"
        xl="3"
        data-cy="daily-change-card"
      >
        <PortfolioAnalyticsTemplate
          title="Daily Change"
          value="+2.12%"
          :percent-change="16"
          icon="mdi-calendar-today"
        />
      </v-col>
      <v-col
        sm="6"
        lg="3"
        xl="3"
        data-cy="goal-progress-card"
      >
        <PortfolioAnalyticsTemplate
          title="Goal Progress"
          value="75%"
          progress="75"
          color="blue"
          icon="mdi-progress-clock"
        />
      </v-col>
      <v-col
        sm="6"
        lg="3"
        xl="3"
        data-cy="account-performance-card"
      >
        <MonthlyProfitLoss
          title="Monthly Realized P/L"
          value="+$5,200.00"
          :percent-change="16"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        xs="12"
        lg="8"
        xl="9"
      >
        <LineChartContainer
          :user-id="user.userId"
          :user-name="user.username"
        />
      </v-col>
      <v-col
        xs="12"
        lg="4"
        xl="3"
      >
        <v-card
          data-cy="recent-trades-card"
          elevation="1"
          outlined
          min-width="350"
          max-width="500"
        >
          <v-card-title
            class="pb-0"
            style="word-break: normal"
          >
            <span class="blue--text">Recent Trades</span>
          </v-card-title>
          <Recents
            v-for="trade in allPosts.slice(0, 4)"
            :key="trade.id"
            :image="trade.image"
            :name="trade.name"
            :tag="trade.tag"
            :company="trade.company"
            :purchased="trade.purchased"
            :when="trade.when"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="holdingData.sumCash === 0 && holdingData.numEquity === 0 && holdingData.numOption === 0">
      <v-col
        xs="12"
        lg="12"
        xl="12"
      >
        <Positions
          :stocks-data="stocks"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        xs="12"
        lg="4"
        xl="3"
      >
        <Holdings :holdings-data="holdingData" />
      </v-col>
      <v-col
        xs="12"
        lg="8"
        xl="9"
      >
        <Positions
          :stocks-data="stocks"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Positions from '../../components/Portfolio/Positions.vue'
import Recents from '../../components/RecentTrades/Recents.vue'
import PortfolioAnalyticsTemplate from '../../components/Portfolio/PortfolioAnalyticsTemplate.vue'
import Holdings from '../../components/Dashboard/Holdings.vue'
import MonthlyProfitLoss from '../../components/Portfolio/MonthlyProfitLoss.vue'
import LineChartContainer from '../../components/ReturnGraphs/EquityGraphs.vue'
import UserService from '../../services/User.service'

export default {
  name: 'DashboardPage',
  components: {
    Positions,
    Recents,
    PortfolioAnalyticsTemplate,
    LineChartContainer,
    Holdings,
    MonthlyProfitLoss
  },
  data () {
    return {
      account: Object,
      stocks: [],
      allPosts: this.$store.getters.allPosts,
      holdingPieChartData: { sumCash: 0, sumEquity: 0, numEquity: 0, sumOption: 0, numOption: 0 }
    }
  },
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    },
    holdingData () {
      return this.holdingPieChartData
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        this.account = await UserService.getAccount(this.user.userId)
        this.stocks = await UserService.getPositions(this.user.userId)
      } catch (err) {
        console.log(err)
      } finally {
        this.handleHoldingPieChartData()
      }
    },
    handleHoldingPieChartData () {
      const sumCash = Number(this.account.cash)
      let sumEquity = 0
      let sumOption = 0
      let numEquity = 0
      let numOption = 0
      this.stocks.forEach(stock => {
        if (stock.asset_class.toLowerCase().includes('equity')) {
          numEquity++
          sumEquity += Number(stock.market_value)
        } else if (stock.asset_class.toLowerCase().includes('option')) {
          numOption++
          sumOption += Number(stock.market_value)
        }
      })
      this.holdingPieChartData.sumCash = sumCash
      this.holdingPieChartData.numEquity = numEquity
      this.holdingPieChartData.sumEquity = sumEquity
      this.holdingPieChartData.numOption = numOption
      this.holdingPieChartData.sumOption = sumOption
    }

  }
}
</script>
