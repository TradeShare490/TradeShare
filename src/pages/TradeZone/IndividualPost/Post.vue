<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col xs="12" sm="12" md="12" lg="9" class="d-flex justify-center py-0">
        <v-card min-width="350" width="800" height="100%" class="mx-10">
          <v-row no-gutters>
            <span
              class="d-flex justify-start text-h4 font-weight-medium my-3"
              :class="{'ml-12': $vuetify.breakpoint.xsOnly, 'ml-1': $vuetify.breakpoint.smAndUp}"
            >
            <router-link to="/tradezone" style="text-decoration: none">
              <v-btn icon>
                <v-icon x-large>mdi-chevron-left</v-icon>
              </v-btn>
            </router-link>
              Trade Zone
            </span>
          </v-row>
          <v-row no-gutters class="mx-5">
            <Feed
                :key="allPosts[targetPost].id"
                :image="allPosts[targetPost].image"
                :name="allPosts[targetPost].name"
                :username="allPosts[targetPost].username"
                :when="allPosts[targetPost].when"
                :purchased="allPosts[targetPost].purchased"
                :company="allPosts[targetPost].company"
                :tag="allPosts[targetPost].tag"
                :size="allPosts[targetPost].size"
                :verified="allPosts[targetPost].verified"
                :stock1="allPosts[targetPost].stock1"
                :stock2="allPosts[targetPost].stock2"
                :stock3="allPosts[targetPost].stock3"
                :stock4="allPosts[targetPost].stock4"
                :disabled="true"
            />
          </v-row>
          <v-row no-gutters class="mx-5">
            <CommentSection 
              :date="commentSection[0].date"
              :time="commentSection[0].time"
              :pfp="commentSection[0].pfp"
              :pfp2="commentSection[0].pfp2"
              :name="commentSection[0].name"
              :when="commentSection[0].when"
              :username="commentSection[0].username"
              :comment="commentSection[0].comment"
            />
          </v-row>
        </v-card>
      </v-col>
      <v-col xs="12" sm="12" md="12" lg="3" class="py-0 px-0">
        <TrendingCompanies class="hidden-md-and-down"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Feed from "../../../../src/components/TradeZone/Feed.vue";
import TrendingCompanies from "../../../components/TrendingCompanies/TrendingCompanies.vue";
import CommentSection from "@/pages/TradeZone/IndividualPost/CommentSection";

export default {
  name: "Post",
  components: {
    CommentSection,
    Feed,
    TrendingCompanies
  },
  data() {
    return {
      targetUser: '',
      postID: NaN,
      targetPost: NaN,
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
        }
      ],
      commentSection: [
        {
          date: 'December 3, 2021',
          time: '3h15 PM',
          pfp: "https://randomuser.me/api/portraits/men/1.jpg",
          pfp2: "https://randomuser.me/api/portraits/men/4.jpg",
          name: "Mac Kafe",
          when: "5h ago",
          username: "@macfeez",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      ]
    }
  },
  methods: {
    getPost() {
      this.targetUser = this.$router.currentRoute.params.username
      this.postID = this.$router.currentRoute.params.id
      this.allPosts.forEach(i => {
        if (i.id == this.postID && i.username === this.targetUser) {
          this.targetPost = i.id - 1
        }
      })
    }
  },
  beforeMount() {
    this.getPost()
  }
}
</script>