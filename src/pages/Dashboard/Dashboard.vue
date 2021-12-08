<template>
  <v-container class="ma-0" fluid>
    <v-row>
      <v-col lg="6" xl="3">
        <PortfolioAnalyticsTemplate
          title="Portfolio Value"
          value="$24,000"
          :percentChange="-20"
          icon="mdi-domain"
        />
      </v-col>
      <v-col lg="6" xl="3">
        <PortfolioAnalyticsTemplate
          title="Daily Change"
          value="+2.12%"
          :percentChange="16"
          icon="mdi-calendar-today"
        /> 
      </v-col
      ><v-col lg="6" xl="3">
        <PortfolioAnalyticsTemplate
          title="Goal Progress"
          value="75%"
          progress="75"
          color="blue"
          icon="mdi-progress-clock"
        />
      </v-col>
      <v-col lg="6" xl="3">
        <MonthlyProfitLoss title="Monthly Realized P/L" value="+$5,200.00" :percentChange="16"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" lg="8" xl="9">
        <v-card min-width="350">
          <Positions /> 
        </v-card>
      </v-col>
      <v-col xs="12" lg="4" xl="3">
        <div>
          <v-card elevation="1" outlined min-width="350">
            <v-card-title class="pb-0" style="word-break: normal">
              <span class="blue--text">Recent Activity</span>
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
            ></Recents>
            <a
              href="/news-feed"
              class="d-flex justify-end"
              style="text-decoration: none; font-size: 12px"
            >
              View all
              <v-icon color="primary" dense> mdi-menu-right </v-icon>
            </a>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" md="4" lg="3">
        <Holdings />
      </v-col>
      <v-col xs="12" md="8" lg="9">
        <v-card elevation="1" outlined min-width="350">
          <BarChartContainer />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Positions from "../../components/Portfolio/Positions.vue";
  import Recents from "../../components/RecentTrades/Recents.vue";
  import PortfolioAnalyticsTemplate from "../../components/Portfolio/PortfolioAnalyticsTemplate.vue";
  import Holdings from "../../components/Dashboard/Holdings.vue";
  import MonthlyProfitLoss from "../../components/Portfolio/MonthlyProfitLoss.vue";
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
        ],
      };
    },
    components: {
      Positions,
      Recents,
      PortfolioAnalyticsTemplate,
      BarChartContainer,
      Holdings,
      MonthlyProfitLoss
    },
  };
</script>