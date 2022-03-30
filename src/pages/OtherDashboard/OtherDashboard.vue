<template>
  <div v-if="userInfo">
    <v-container
      class="ma-0"
      fluid
    >
      <div class="d-flex justify-center">
        <Profile
          :otheruser="info"
          :currentlyfollowing="isFollowingByUser"
          :is-private="info.isPrivate"
        />
      </div>
      <div v-if="showData">
        <v-row>
          <v-col
            xs="12"
            md="8"
            lg="9"
          >
            <LineChartContainer
              :user-id="userId"
              :user-name="userInfo.username"
              :compare-me="true"
              data-cy="other-dashboard-equities"
            />
          </v-col>
          <v-col
            v-if="holdingData.sumCash === 0 && holdingData.numEquity === 0 && holdingData.numOption === 0"
            xs="12"
            md="4"
            lg="3"
          />
          <v-col
            v-else
            xs="12"
            md="4"
            lg="3"
          >
            <Holdings
              :holdings-data="holdingData"
              data-cy="other-dashboard-holdings"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            xs="12"
            lg="8"
            xl="9"
          >
            <v-card min-width="350">
              <Positions
                :stocks-data="stocks"
                data-cy="other-dashboard-positions"
              />
            </v-card>
          </v-col>
          <v-col
            xs="12"
            lg="4"
            xl="3"
          >
            <div>
              <v-card
                elevation="1"
                outlined
                min-width="350"
              >
                <v-card-title
                  class="pb-0"
                  style="word-break: normal"
                >
                  <span class="blue--text">Recent Trades</span>
                </v-card-title>
                <div v-if="activities.length!==0">
                  <Recents
                    v-for="trade in activities.slice(0,4)"
                    :key="trade.id"
                    :image="'https://randomuser.me/api/portraits/men/35.jpg'"
                    :name="userInfo.firstname + ' ' + userInfo.lastname"
                    :tag="trade.symbol"
                    :company="'Quantity:' + trade.qty"
                    :purchased="trade.side === 'buy'"
                    :when="timeSince(trade.transaction_time)"
                    data-cy="other-dashboard-recents"
                  />
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>
      <div
        v-else
        class="mt-10"
      >
        <h2>
          This Account is Private
        </h2>
        <p>Follow this account to see their content</p>
      </div>
    </v-container>
  </div>
  <div
    v-else-if="info.blocked"
    class="mt-10"
  >
    <h2>
      User has been blocked
    </h2>
  </div>
  <div
    v-else-if="userInfo == ''"
    class="mt-10"
  >
    <h2>
      Invalid user
    </h2>
  </div>
  <div v-else>
    <div class="mt-16">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      />
    </div>
  </div>
</template>

<script>
import Positions from '../../components/Portfolio/Positions.vue'
import Profile from '../../components/Profile/Profile.vue'
import Recents from '../../components/RecentTrades/Recents'
import LineChartContainer from '../../components/ReturnGraphs/EquityGraphs'
import Holdings from '../../components/Dashboard/Holdings'
import UserService from '../../services/User.service'

export default {
  name: 'OtherDashboard',
  components: {
    Positions,
    Profile,
    Recents,
    LineChartContainer,
    Holdings
  },
  // mixins: [useFollowMixin],
  data () {
    return {
      userId: this.$route.params.id,
      userInfo: null,
      info: {},
      account: Object,
      stocks: [],
      followNum: [],
      isFollowingByUser: false,
      activities: [],
      holdingPieChartData: { sumCash: 0, sumEquity: 0, numEquity: 0, sumOption: 0, numOption: 0 }
    }
  },
  computed: {
    showData () {
      return !this.userInfo.isPrivate || (this.userInfo.isPrivate && this.isFollowingByUser)
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
        this.userInfo = await UserService.getUserInfo(this.userId)
        this.account = await UserService.getAccount(this.userInfo.userId)
        this.stocks = await UserService.getPositions(this.userInfo.userId)
        this.followNum = await UserService.getFollowNum(this.userInfo.userId)
        this.isFollowingByUser = await UserService.isFollowed(this.userInfo.userId)
        this.activities = await UserService.getActivities(this.userInfo.userId)
        this.info = {
          ...this.userInfo,
          numFollowers: this.followNum.numFollower,
          numFollowing: this.followNum.numFollowing,
          following: this.isFollowingByUser,
          date: '2021',
          favorite: false,
          blocked: false
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.handleHoldingPieChartData()
      }
    },
    timeSince (date) {
      const time = new Date(date).getTime() / 1000

      const seconds = Math.floor(((new Date().getTime() / 1000 - time)))

      let interval = seconds / 31536000

      if (interval > 1) {
        return Math.floor(interval) === 1 ? ' a year ago' : Math.floor(interval) + ' years ago'
      }
      interval = seconds / 2592000
      if (interval > 1) {
        return Math.floor(interval) === 1 ? ' a month ago' : Math.floor(interval) + ' months ago'
      }
      interval = seconds / 86400
      if (interval > 1) {
        return Math.floor(interval) === 1 ? ' a day ago' : Math.floor(interval) + ' days ago'
      }
      interval = seconds / 3600
      if (interval > 1) {
        return Math.floor(interval) === 1 ? ' an hour ago' : Math.floor(interval) + ' hours ago'
      }
      interval = seconds / 60
      if (interval > 1) {
        return Math.floor(interval) === 1 ? ' a minute ago' : Math.floor(interval) + ' minutes ago'
      }
      return Math.floor(interval) === 1 ? ' a second ago' : Math.floor(interval) + ' seconds ago'
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
