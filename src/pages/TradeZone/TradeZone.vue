<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" sm="12" md="12" lg="9">
        <span class="d-flex justify-start text-h4 font-weight-medium ml-1 mb-2"
          >Latest Activity</span
        >
        <v-alert outlined color="grey lighten-2" class="pa-0 ma-0">
          <Latest
            v-for="activity in latestActivities"
            :key="activity.id"
            :image="activity.image"
            :name="activity.name"
            :purchased="activity.purchased"
            :company="activity.company"
            :tag="activity.tag"
            :size="activity.size"
            :when="activity.when"
            :verified="activity.verified"
            :stock1="activity.stock1"
            :stock2="activity.stock2"
            :stock3="activity.stock3"
            :stock4="activity.stock4"
          ></Latest>
        </v-alert>
      </v-col>
      <!-- PLACEHOLDER FOR TRENDING COMPANIES -->
      <v-col xs="12" sm="12" md="12" lg="3">
        <TrendingCompanies />
      </v-col>
      <!-- PLACEHOLDER FOR TRENDING COMPANIES -->
    </v-row>
  </v-container>
</template>
<script>
import Latest from "../../components/LatestActivity/Latest.vue";
import TrendingCompanies from "../../components/NewsFeed/TrendingCompanies.vue";

export default {
  name: "TradeZone",
  data() {
    return {
      latestActivities: [
        {
          id: 1,
          image: "https://randomuser.me/api/portraits/men/35.jpg",
          name: "Ash Britain",
          purchased: true,
          company: "Twitter Inc.",
          tag: "TWTR",
          size: 50,
          when: "Today",
          verified: false,
          stock1: 312.92,
          stock2: "+0.52%",
          stock3: 311.7,
          stock4: "Post+0.16%",
        },
        {
          id: 2,
          image: "https://randomuser.me/api/portraits/men/52.jpg",
          name: "Tim Robenman",
          purchased: false,
          company: "NVIDIA Corp.",
          tag: "NVDA",
          size: 150,
          when: "Today",
          verified: true,
          stock1: 222.42,
          stock2: "+0.41%",
          stock3: 222.7,
          stock4: "Post+0.13%",
        },
        {
          id: 3,
          image: "https://randomuser.me/api/portraits/men/86.jpg",
          name: "Mac Kafe",
          purchased: true,
          company: "Tesla Inc.",
          tag: "TSLA",
          size: 1000,
          when: "Today",
          verified: true,
          stock1: 755.83,
          stock2: "+1.52%",
          stock3: 755.1,
          stock4: "Post+0.91%",
        },
        {
          id: 4,
          image: "https://randomuser.me/api/portraits/men/35.jpg",
          name: "Ash Britain",
          purchased: false,
          company: "Voyager Digital Ltd.",
          tag: "VYGR",
          size: 15,
          when: "Yesterday",
          verified: false,
          stock1: 14.98,
          stock2: "-0.25%",
          stock3: 15.04,
          stock4: "Post+0.19%",
        },
        {
          id: 5,
          image: "https://randomuser.me/api/portraits/men/52.jpg",
          name: "Tim Robenman",
          purchased: false,
          company: "NVIDIA Corp.",
          tag: "NVDA",
          size: 150,
          when: "Yesterday",
          verified: true,
          stock1: 222.42,
          stock2: "+0.41%",
          stock3: 222.7,
          stock4: "Post+0.13%",
        },
      ],
    };
  },
  components: {
    Latest,
    TrendingCompanies,
  },
};
</script>