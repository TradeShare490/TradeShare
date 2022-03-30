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
            />
          </v-col>
          <v-col
            xs="12"
            md="4"
            lg="3"
          >
            <Holdings />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            xs="12"
            lg="8"
            xl="9"
          >
            <v-card min-width="350">
              <Positions :user-id="userId" />
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
  mixins: [utils],
  data () {
    return {
      isLoading: false,
      blocked: false,
      userId: this.$route.params.id,
      userInfo: null,
      info: {},
      positions: [],
      followNum: [],
      isFollowingByUser: false,
      activities: [],
      blockedUsers: []
    }
  },
  computed: {
    showData () {
      return !this.userInfo.isPrivate || (this.userInfo.isPrivate && this.isFollowingByUser)
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.isLoading = true
      this.userInfo = await UserService.getUserInfo(this.userId)
      this.positions = await UserService.getPositions(this.userInfo.userId)
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
      this.isLoading = false
    }
  }
}
</script>
