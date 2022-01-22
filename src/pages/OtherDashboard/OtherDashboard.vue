<template>
  <div>
    <Profile :user="info" />
    <v-container class="ma-0" fluid>
      <v-row>
        <v-col xs="12" md="8" lg="9">
          <v-card elevation="1" outlined min-width="350">
            <BarChartContainer />
          </v-card>
        </v-col>
        <v-col xs="12" md="4" lg="3">
          <Holdings />
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="12" lg="8" xl="9">
          <v-card min-width="350">
            <Positions :userId="userId" />
          </v-card>
        </v-col>
        <v-col xs="12" lg="4" xl="3">
          <div>
            <v-card elevation="1" outlined min-width="350">
              <v-card-title class="pb-0" style="word-break: normal">
                <span class="blue--text">Recent Trades</span>
              </v-card-title>
              <Recents
                v-for="trade in recentTrades"
                :key="trade.id"
                :image="trade.image"
                :name="trade.name"
                :company="trade.company"
                :purchased="trade.purchased"
                :when="trade.when"
                :today="trade.today"
              ></Recents>
              <router-link
                to="/tradezone"
                class="d-flex justify-end"
                style="text-decoration: none; font-size: 12px"
              >
                View all
                <v-icon color="primary" dense> mdi-menu-right </v-icon>
              </router-link>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Positions from "../../components/Portfolio/Positions.vue";
import Profile from "../../components/Profile/Profile.vue";
import Recents from "../../components/RecentTrades/Recents";
import BarChartContainer from "../../components/ReturnGraphs/ReturnGraphs";
import Holdings from "../../components/Dashboard/Holdings";
import UserService from "../../services/User.service";
export default {
  name: "OtherDashboard",
  data() {
    return {
      userId: this.$route.params.id,
      recentTrades: [
        {
          id: 1,
          image: "https://randomuser.me/api/portraits/men/35.jpg",
          name: "Ash Britain",
          company: "Dropbox",
          purchased: true,
          when: "Today",
          today: true
        },
        {
          id: 2,
          image: "https://randomuser.me/api/portraits/men/52.jpg",
          name: "Tim Robenman",
          company: "NVIDIA",
          purchased: false,
          when: "Today",
          today: true
        },
        {
          id: 3,
          image: "https://randomuser.me/api/portraits/men/86.jpg",
          name: "Mac Kafe",
          company: "Twitter",
          purchased: true,
          when: "Yesterday",
          today: false
        },
        {
          id: 4,
          image: "https://randomuser.me/api/portraits/men/52.jpg",
          name: "Tim Robenman",
          company: "Voyager",
          purchased: false,
          when: "Today",
          today: true
        }
      ],
      stocks: [
        // {
        //   symbol: "MSFT",
        //   positionSize: 1000,
        //   date: new Date().toLocaleString(),
        //   profitLoss: 21.33,
        //   verified: true
        // },
        // {
        //   symbol: "AAPL",
        //   positionSize: 25,
        //   date: new Date("10/12/2021").toLocaleString(),
        //   profitLoss: -3.76,
        //   verified: false
        // },
        // {
        //   symbol: "FSRLMAOOO",
        //   positionSize: 240,
        //   date: new Date("10/13/2021").toLocaleString(),
        //   profitLoss: 67.3,
        //   verified: true
        // }
      ],
      userInfo: {
        name: "Benver Vloshki",
        nickname: "Ben",
        labelText: "untagged",
        labelColor: "untagged",
        date: "2021",
        bio: "This section is available for a small bio. Optional.",
        numFollowers: "11K",
        numFollowing: "5K",
        following: false
      },
      info: {},
      positions: []
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.info = {
        ...(await UserService.getUserInfo(this.userId)),
        numFollowers: "11K",
        numFollowing: "5K",
        following: false,
        date: "2021",
        bio: "This section is available for a small bio. Optional."
      };
      this.positions = await UserService.getPositions(this.userId);
    }
  },
  components: {
    Positions,
    Profile,
    Recents,
    BarChartContainer,
    Holdings
  }
};
</script>
