<template>
  <div v-if="userInfo && !blocked && !isLoading">
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
        <div v-if="hasAlpaca">
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
                  :stocks-data="ostocks"
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
            This Account hasn't linked to any brokerage services
          </h2>
        </div>
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
    v-else-if="isLoading"
    class="mt-10"
  >
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      :width="7"
    />
  </div>
  <div
    v-else-if="blocked"
    class="mt-10"
  >
    <h2>
      User blocked your account
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
import { useDashboardMixin } from '../../hooks/useDashboardMixin.js'
import { utils } from '../../services/utils'

export default {
  name: 'OtherDashboard',
  components: {
    Positions,
    Profile,
    Recents,
    LineChartContainer,
    Holdings
  },
  mixins: [useDashboardMixin, utils],
  data () {
    return {
      isLoading: false,
      blocked: false,
      userId: this.$route.params.id,
      userInfo: null,
      info: {},
      account: Object,
      ostocks: [],
      followNum: [],
      isFollowingByUser: false,
      activities: [],
      blockedUsers: []
    }
  },
  computed: {
    showData () {
      return !this.userInfo.isPrivate || (this.userInfo.isPrivate && this.isFollowingByUser)
    },
    hasAlpaca () {
      return this.userInfo.alpacaToken !== 'None' && this.userInfo.alpacaToken !== undefined
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        this.isLoading = true
        this.userInfo = await UserService.getUserInfo(this.userId)
        this.account = await UserService.getAccount(this.userInfo.userId)
        this.ostocks = await UserService.getPositions(this.userInfo.userId)
        this.followNum = await UserService.getFollowNum(this.userInfo.userId)
        this.isFollowingByUser = await UserService.isFollowed(this.userInfo.userId)
        this.activities = await UserService.getActivities(this.userInfo.userId)
        this.blockedUsers = await UserService.getBlockedUsers(this.userInfo.userId, true)
        this.blocked = this.blockedUsers.includes(JSON.parse(localStorage.getItem('user')).userId)
        this.info = {
          ...this.userInfo,
          numFollowers: this.followNum.numFollower,
          numFollowing: this.followNum.numFollowing,
          following: this.isFollowingByUser,
          date: '2021',
          favorite: false,
          blocked: false
        }
      } catch (otherDashboardErr) {
        console.log(otherDashboardErr)
      } finally {
        this.handleHoldingPieChartData()
        this.isLoading = false
      }
    }
  }
}
</script>
