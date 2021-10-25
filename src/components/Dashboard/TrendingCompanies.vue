<template>
  <v-card
    class="sticky-card hidden-sm-and-down float-right mt-0"
    height="100%"
    width="35%"
  >
    <v-row class="mb-5">
      <v-col>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
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
          class="mt-4"
          flat
          append-icon="null"
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
    <v-list-item>
      <v-list-item-content class="text-right">
        <v-list-item-title
          >View all <v-icon>mdi-chevron-right</v-icon></v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import CompanyCard from "./CompanyCard.vue";
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
