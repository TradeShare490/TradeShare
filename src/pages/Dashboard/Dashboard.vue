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
    <v-col>
      <FollowNotif
      :currentlyFollowing="false"
      currentLabelColor="friend"
      currentLabelText="friend"
      image="https://randomuser.me/api/portraits/men/52.jpg"
      message="John Molson has followed you :)"
      icon="../assets/exclamationPoint.jpg"
      >

      </FollowNotif>
    </v-col>
  </v-row>
</template>

<script>
// import Profile from "../../components/Dashboard/Profile.vue"
// Adding follow function to script
import PortfolioAnalyticsTemplate from "../../components/Portfolio/PortfolioAnalyticsTemplate.vue";
import FollowNotif from "../../components/Notification/Notifications.vue";

export default {
  name: "Dashboard",
  components: {
    // Profile,
    PortfolioAnalyticsTemplate,
    FollowNotif
  },
};
</script>