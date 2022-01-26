<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" sm="12" md="12" lg="9" class="d-flex justify-center py-0 mb-2">
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
                :key="id"
                :image="image"
                :name="name"
                :username="username"
                :when="when"
                :purchased="purchased"
                :company="company"
                :tag="tag"
                :size="size"
                :verified="verified"
                :stock1="stock1"
                :stock2="stock2"
                :stock3="stock3"
                :stock4="stock4"
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
import Feed from "../../../../src/components/TradeZone/Feed.vue";
import TrendingCompanies from "../../../components/TrendingCompanies/TrendingCompanies.vue";

export default {
  name: "Post",
  components: {
    Feed,
    TrendingCompanies
  }
}
</script>

<style scoped>

</style>