<template>
  <!-- <Profile/> -->
  <v-row>
    <v-col>
      <PortfolioAnalyticsTemplate title="Portfolio Value" value="$24,000" :percentChange="-20" icon="mdi-domain"/>
    </v-col>
    <v-col>
      <PortfolioAnalyticsTemplate title="Daily Change" value="+2.12%" :percentChange="16" icon="mdi-calendar-today"/> </v-col
    ><v-col>
      <PortfolioAnalyticsTemplate title="Goal Progress" value="75%" progress="75" color="blue" icon="mdi-progress-clock"/>
    </v-col>
  </v-row>

</template>

<script>
// import Profile from "../../components/Dashboard/Profile.vue"
// Adding follow function to script
import PortfolioAnalyticsTemplate from "../../components/Portfolio/PortfolioAnalyticsTemplate.vue";

export default {
  name: "Dashboard",
  components: {
    // Profile,
    PortfolioAnalyticsTemplate
  },
};
</script>