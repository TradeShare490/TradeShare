<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" sm="12" md="12" lg="9" class="d-flex justify-center py-0">
        <v-card min-width="350" width="800" height="100%" class="mx-10 mb-3">
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
              :id="post.id"
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
              :disabled="false"
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
  components: {
    Feed,
    TrendingCompanies,
  },
  data() {
    return {
      allPosts: this.$store.getters.allPosts
    }
  }
}
</script>