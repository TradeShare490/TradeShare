<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" sm="12" md="12" lg="9" class="d-flex justify-center py-0 mb-2">
        <v-card min-width="350" width="800" height="100%" class="mx-10">
          <v-row no-gutters>
            <span 
                class="text-h4 font-weight-medium my-3"
                :class="{'ml-15': $vuetify.breakpoint.xsOnly, 'ml-9': $vuetify.breakpoint.smAndUp}"
            >
              Trade Zone
            </span>
          </v-row>
          <v-row no-gutters class="mx-5">
            <Feed
              v-for="post in allPosts"
              :key="post.id"
              :image="post.image"
              :name="post.name"
              :username="post.username"
              :when="post.when"
              :purchased="post.purchased"
              :company="post.company"
              :tag="post.tag"
              :size="post.size"
              :verified="post.verified"
              :stock1="post.stock1"
              :stock2="post.stock2"
              :stock3="post.stock3"
              :stock4="post.stock4"
            />
          </v-row>
        </v-card>
      </v-col>
      <v-col xs="12" sm="12" md="12" lg="3" class="py-0 px-0">
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
          username: "@ashcoin63",
          when: "10min ago",
          purchased: true,
          company: "Twitter Inc.",
          tag: "TWTR",
          size: 50,
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
          username: "@timthetatman",
          when: "18h ago",
          purchased: false,
          company: "NVIDIA Corp.",
          tag: "NVDA",
          size: 150,
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
          username: "@mcafeez",
          when: "Dec 10",
          purchased: true,
          company: "Tesla Inc.",
          tag: "TSLA",
          size: 1000,
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
          username: "@ashcoin63",
          when: "Dec 8",
          purchased: false,
          company: "Voyager Digital Ltd.",
          tag: "VYGR",
          size: 15,
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
          username: "@timthetatman",
          when: "Nov 29",
          purchased: false,
          company: "NVIDIA Corp.",
          tag: "NVDA",
          size: 150,
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