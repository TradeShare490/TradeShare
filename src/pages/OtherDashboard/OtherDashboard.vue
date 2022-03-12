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
        />
      </div>
      <v-row>
        <v-col
          xs="12"
          md="8"
          lg="9"
        >
          <BarChartContainer />
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
          <v-btn @click="test">
            STATE
          </v-btn>
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
              <Recents
                v-for="trade in allPosts.splice(0, 4)"
                :key="trade.id"
                :image="trade.image"
                :name="trade.name"
                :tag="trade.tag"
                :company="trade.company"
                :purchased="trade.purchased"
                :when="trade.when"
              />
            </v-card>
          </div>
        </v-col>
      </v-row>
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
import BarChartContainer from '../../components/ReturnGraphs/ReturnGraphs'
import Holdings from '../../components/Dashboard/Holdings'
import UserService from '../../services/User.service'
// import { useFollowMixin } from '../../hooks/useFollowMixin.js'

export default {
  name: 'OtherDashboard',
  components: {
    Positions,
    Profile,
    Recents,
    BarChartContainer,
    Holdings
  },
  // mixins: [useFollowMixin],
  data () {
    return {
      userId: this.$route.params.id,
      allPosts: this.$store.getters.allPosts,
      userInfo: null,
      info: {},
      positions: [],
      followNum: [],
      isFollowingByUser: false
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    test () {
      console.log('userInfo')
      console.log(this.userInfo)
      console.log('this.positions')
      console.log(this.positions)
      console.log('this.info')
      console.log(this.info)
      console.log('this.followNum')
      console.log(this.followNum)
      console.log('this.isFollowingByUser')
      console.log(this.isFollowingByUser)
    },
    async initialize () {
      console.log('OTHER INITIALIZE()')
      this.userInfo = await UserService.getUserInfo(this.userId)
      console.log('a')
      console.log(this.userInfo)
      this.positions = await UserService.getPositions(this.userInfo.userId)
      console.log('OTHER POSITION')
      console.log(this.positions)
      this.followNum = await UserService.getFollowNum(this.userInfo.userId)
      console.log('OTHER FOLLOW')
      console.log(this.followNum)
      this.isFollowingByUser = await UserService.isFollowed(this.userInfo.userId)
      console.log('IS FOLLOW?')
      console.log(this.isFollowingByUser)
      this.info = {
        ...this.userInfo,
        numFollowers: this.followNum.numFollower,
        numFollowing: this.followNum.numFollowing,
        following: this.isFollowingByUser,
        date: '2021',
        favorite: false,
        blocked: false
      }
    }
  }
}
</script>
