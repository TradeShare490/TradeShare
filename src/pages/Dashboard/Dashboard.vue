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
            v-for="activity in recentActivities"
            :key="activity.id"
            :image="activity.image"
            :name="activity.name"
            :company="activity.company"
            :purchased="activity.purchased"
            :when="activity.when"
            :today="activity.today"
          />
          <router-link
            to="/tradezone"
            class="d-flex justify-end"
            style="text-decoration: none; font-size: 12px"
            data-cy="recent-trade-view-all"
          >
            View all
            <v-icon
              color="primary"
              dense
            >
              mdi-menu-right
            </v-icon>
          </router-link>
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
      recentActivities: [
        {
          id: 1,
          image: 'https://randomuser.me/api/portraits/men/35.jpg',
          name: 'Ash Britain',
          company: 'Dropbox',
          purchased: true,
          when: 'Today',
          today: true
        },
        {
          id: 2,
          image: 'https://randomuser.me/api/portraits/men/52.jpg',
          name: 'Tim Robenman',
          company: 'NVIDIA',
          purchased: false,
          when: 'Today',
          today: true
        },
        {
          id: 3,
          image: 'https://randomuser.me/api/portraits/men/86.jpg',
          name: 'Mac Kafe',
          company: 'Twitter',
          purchased: true,
          when: 'Yesterday',
          today: false
        },
        {
          id: 4,
          image: 'https://randomuser.me/api/portraits/men/52.jpg',
          name: 'Tim Robenman',
          company: 'Voyager',
          purchased: false,
          when: 'Today',
          today: true
        }
      ]
    }
  },
  computed: {
    user () {
      // console.log(JSON.parse(localStorage.getItem('user')))
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.account = await UserService.getAccount(this.user.userId)
      console.log('userId ' + this.user.userId)
    }
  }
}
</script>
