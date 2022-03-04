<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row no-gutters>
      <v-col
        xs="12"
        sm="12"
        md="12"
        lg="9"
        class="d-flex justify-center py-0"
      >
        <v-card
          min-width="350"
          width="800"
          height="100%"
          class="mx-10"
        >
          <v-row no-gutters>
            <span
              class="d-flex justify-start text-h4 font-weight-medium my-3"
              :class="{
                'ml-12': $vuetify.breakpoint.xsOnly,
                'ml-1': $vuetify.breakpoint.smAndUp
              }"
            >
              <router-link
                to="/tradezone"
                style="text-decoration: none"
              >
                <v-btn icon>
                  <v-icon x-large>mdi-chevron-left</v-icon>
                </v-btn>
              </router-link>
              Trade Zone
            </span>
          </v-row>
          <v-row
            no-gutters
            class="mx-5"
            data-cy="post-data"
          >
            <Feed
              :key="allPosts[postID - 1].id"
              :image="allPosts[postID - 1].image"
              :name="allPosts[postID - 1].name"
              :username="allPosts[postID - 1].username"
              :when="allPosts[postID - 1].when"
              :purchased="allPosts[postID - 1].purchased"
              :company="allPosts[postID - 1].company"
              :tag="allPosts[postID - 1].tag"
              :size="allPosts[postID - 1].size"
              :verified="allPosts[postID - 1].verified"
              :stock1="allPosts[postID - 1].stock1"
              :stock2="allPosts[postID - 1].stock2"
              :stock3="allPosts[postID - 1].stock3"
              :stock4="allPosts[postID - 1].stock4"
              :disabled="true"
            />
          </v-row>
          <v-row
            no-gutters
            class="mx-5"
          >
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
      <v-col
        xs="12"
        sm="12"
        md="12"
        lg="3"
        class="py-0 px-0"
      >
        <TrendingCompanies class="hidden-md-and-down" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Feed from '../../../../src/components/TradeZone/Feed.vue'
import TrendingCompanies from '../../../components/TrendingCompanies/TrendingCompanies.vue'
import CommentSection from '@/pages/TradeZone/IndividualPost/CommentSection'

export default {
  name: 'IndividualPost',
  components: {
    CommentSection,
    Feed,
    TrendingCompanies
  },
  data () {
    return {
      targetUser: this.$router.currentRoute.params.username,
      postID: this.$router.currentRoute.params.postID,
      allPosts: this.$store.getters.allPosts,
      commentSection: [
        {
          date: 'December 3, 2021',
          time: '3h15 PM',
          pfp: 'https://randomuser.me/api/portraits/men/1.jpg',
          pfp2: 'https://randomuser.me/api/portraits/men/4.jpg',
          name: 'Mac Kafe',
          when: '5h ago',
          username: '@macfeez',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]
    }
  }
}
</script>
