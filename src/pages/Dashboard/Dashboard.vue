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
          :value="'$'+ account.portfolio_value"
          color="red"
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
          :value="dailyChange + '%'"
          color="green"
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
          title="Portfolio Age"
          :value="getAge(account.created_at)"
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
          :value="monthlyChange"
          percent-change="16"
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
            v-for="trade in activities.slice(0,4)"
            :key="trade.id"
            :image="'https://randomuser.me/api/portraits/men/1.jpg'"
            :name="user.firstname + ' ' + user.lastname"
            :tag="trade.symbol"
            :company="'Quantity:' + trade.qty"
            :purchased="trade.side === 'buy'"
            :when="timeSince(trade.transaction_time)"
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
        <Positions :user-id="user.userId" />
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
import { utils } from '../../services/utils'

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
  mixins: [utils],
  data () {
    return {
      account: Object,
      allPosts: this.$store.getters.allPosts,
      monthHistory: {
        equity: [],
        profit_lost_pct: []
      },
      activities: []
    }
  },
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    },
    dailyChange () {
      return (((this.account.equity - this.account.last_equity) * 100) / this.account.last_equity).toFixed(2).toString()
    },
    monthlyChange () {
      const monthChange = (this.monthHistory.equity[0] - this.monthHistory.equity.at(-1)).toFixed(2)
      return monthChange >= 0 ? '$' + monthChange : '-$' + Math.abs(Number(monthChange))
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.account = await UserService.getAccount(this.user.userId)
      this.monthHistory = await UserService.getEquities(this.user.userId, '1M')
      this.activities = await UserService.getActivities(this.user.userId)
    }

  }
}
</script>
