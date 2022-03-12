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
        <Positions :user-id="user.userId" />
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
    <v-row>
      <v-col
        xs="12"
        lg="4"
        xl="3"
      >
        <Holdings />
      </v-col>
      <v-col
        xs="12"
        lg="8"
        xl="9"
      >
        <BarChartContainer />
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
import BarChartContainer from '../../components/ReturnGraphs/ReturnGraphs.vue'
import UserService from '../../services/User.service'

export default {
  name: 'DashboardPage',
  components: {
    Positions,
    Recents,
    PortfolioAnalyticsTemplate,
    BarChartContainer,
    Holdings,
    MonthlyProfitLoss
  },
  data () {
    return {
      account: Object,
      allPosts: this.$store.getters.allPosts
    }
  },
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.account = await UserService.getAccount(this.user.userId)
    }

  }
}
</script>
