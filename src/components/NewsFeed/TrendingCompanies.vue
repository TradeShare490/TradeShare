<template>
  <v-card class="sticky-card mt-3">
    <v-row class="mb-5">
      <v-col>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-centre mt-3"
              >Trending Companies<v-icon
                >mdi-trending-up</v-icon
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col>
        <v-autocomplete
          dense
          v-model="searchCriteria"
          :search-input="search"
          @update:search-input="(val) => (search = val)"
          class="mt-4 mx-3"
          flat
          append-icon="mdi-magnify"
          rounded
          hide-no-data
          hide-details
          label="Search"
          outlined
          color="primary"
          height="10px"
          return-object
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-list disabled>
      <div v-for="company in companies" :key="company.title">
        <CompanyCard
          :title="company.title"
          :subtitle="company.subtitle"
          :imgsrc="company.imageSource"
        />

        <v-divider class="my-3"></v-divider>
      </div>
    </v-list>
    <a
      href="/news-feed"
      class="d-flex justify-end"
      style="text-decoration: none; font-size: 12px"
    >
      View all
      <v-icon color="primary" dense> mdi-menu-right </v-icon>
    </a>
  </v-card>
</template>

<script>
import CompanyCard from "../Dashboard/CompanyCard.vue";
export default {
  components: { CompanyCard },
  name: "TrendingCompanies",
  data() {
    return {
      searchCriteria: "",
      search: null,
      companies: [
        {
          title: "Dropbox",
          subtitle: "sold recently by Dave",
          imageSource: "../../assets/TradeShare.png",
        },
        {
          title: "Medium Corporation",
          subtitle: "bought recently by Dave",

          imageSource: "../../assets/TradeShare.png",
        },
        {
          title: "Github",
          subtitle: "sold recently by Fred",

          imageSource: "../../assets/TradeShare.png",
        },
        {
          title: "Slack",
          subtitle: "bought recently by Fred",

          imageSource: "../../assets/TradeShare.png",
        },
        {
          title: "Twitter",
          subtitle: "sold recently by you",

          imageSource: "../../assets/TradeShare.png",
        },
      ],
    };
  },
};
</script>
