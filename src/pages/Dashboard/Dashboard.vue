<template>
  <!-- <Profile/> -->
  <div>
    <div class="ma-5">
      <v-row>
        <v-col>
          <PortfolioAnalyticsTemplate title="Portfolio Value" value="$24,000" :percentChange="-20" icon="mdi-domain"/>
        </v-col>
        <v-col>
          <PortfolioAnalyticsTemplate title="Daily Change" value="+2.12%" :percentChange="16" icon="mdi-calendar-today"/> </v-col
        ><v-col>
          <PortfolioAnalyticsTemplate title="Goal Progress" value="75%" progress="75" color="blue" icon="mdi-progress-clock"/>
        </v-col> 
        <v-col>
          <BarChartContainer/> 
        </v-col>
      </v-row>
    </div>

     <div class="ma-5">
       <Positions/>
     </div>

    <div class="ma-5 d-flex justify-end">
      <v-card
        elevation="1"
        outlined
        max-width="23vw"
      >
      <v-card-title class="pb-0" style="word-break: normal">
        <span class="blue--text">Recent Activity</span>
      </v-card-title>
        <Recents
          v-for="activity in recentActivities"
          :key="activity.id"
          :image=activity.image
          :name="activity.name"
          :company="activity.company"
          :purchased="activity.purchased"
          :when="activity.when"
          :today="activity.today"
        ></Recents>
        <a
          href="/news-feed"
          class="d-flex justify-end"
          style="text-decoration: none; font-size: 12px"
        >
          View all
          <v-icon color="primary" dense>
            mdi-menu-right
          </v-icon>
        </a>
      </v-card>
    </div>
  </div>
</template>

<script>
// import Profile from "../../components/Dashboard/Profile.vue"
import Positions from "../../components/Portfolio/Positions.vue"
import Recents from "../../components/RecentActivity/Recents.vue"
import PortfolioAnalyticsTemplate from "../../components/Portfolio/PortfolioAnalyticsTemplate.vue";
import BarChartContainer from "../../components/ReturnGraphs/ReturnGraphs.vue"

export default {
  name: "Dashboard",
  data() {
        return {
            recentActivities: [
                {
                    id: 1,
                    image: "https://randomuser.me/api/portraits/men/35.jpg",
                    name: "Ash Britain",
                    company: "Dropbox",
                    purchased: true,
                    when: "Today",
                    today: true,
                },
                {
                    id: 2,
                    image: "https://randomuser.me/api/portraits/men/52.jpg",
                    name: "Tim Robenman",
                    company: "NVIDIA",
                    purchased: false,
                    when: "Today",
                    today: true,
                },
                {   
                    id: 3,
                    image: "https://randomuser.me/api/portraits/men/86.jpg",
                    name: "Mac Kafe",
                    company: "Twitter",
                    purchased: true,
                    when: "Yesterday",
                    today: false,
                },
                {
                    id: 4,
                    image: "https://randomuser.me/api/portraits/men/52.jpg",
                    name: "Tim Robenman",
                    company: "Voyager",
                    purchased: false,
                    when: "Today",
                    today: true,
                },
            ]
        }
    },
  components: {
    // Profile,
    Positions,
    Recents,
    PortfolioAnalyticsTemplate,
    BarChartContainer
  },
};
</script>