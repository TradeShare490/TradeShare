<template>
  <div v-if="userInfo">
    <v-container
      class="ma-0"
      fluid
    >
      <div class="d-flex justify-center">
        <Profile :user="info" />
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

export default {
  name: 'OtherDashboard',
  components: {
    Positions,
    Profile,
    Recents,
    BarChartContainer,
    Holdings
  },
  data () {
    return {
      userId: this.$route.params.id,
      allPosts: this.$store.getters.allPosts,
      userInfo: null,
      info: {},
      positions: []
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      console.log(this.userInfo)
      this.userInfo = await UserService.getUserInfo(this.userId)
      this.info = {
        ...this.userInfo,
        numFollowers: '11K',
        numFollowing: '5K',
        following: true,
        date: '2021',
        favorite: false,
        blocked: false
      }
      this.positions = await UserService.getPositions(this.userId)
      console.log(this.userInfo)
    }
  }
}
</script>
