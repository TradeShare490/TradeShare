<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" sm="12" md="12" lg="9">
        <span class="d-flex justify-start text-h4 font-weight-medium ml-1 mb-2"
          >Trade Zone</span
        >
        <v-alert outlined color="grey lighten-2" class="pa-0 ma-0">
          <Feed
            v-for="post in allPosts"
            :key="post.id"
            :image="post.image"
            :name="post.name"
            :purchased="post.purchased"
            :company="post.company"
            :tag="post.tag"
            :size="post.size"
            :when="post.when"
            :verified="post.verified"
            :stock1="post.stock1"
            :stock2="post.stock2"
            :stock3="post.stock3"
            :stock4="post.stock4"
          ></Feed>
        </v-alert>
      </v-col>
      <v-col xs="12" sm="12" md="12" lg="3">
        <TrendingCompanies />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Feed from "../../components/TradeZone/Feed.vue";
import TrendingCompanies from "../../components/TrendingCompanies/TrendingCompanies.vue";

export default {
  name: "TradeZone",
  data() {
    return {
      allPosts: [
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
    Feed,
    TrendingCompanies,
  },
};
</script>