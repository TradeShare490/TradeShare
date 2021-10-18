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
        <v-list-item>
          <v-list-item-avatar class="avatar" tile>
            <v-img src="../../assets/TradeShare.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="text-left ml-3">
            <v-list-item-title>{{ company.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ company.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-list-item-icon>
        </v-list-item>

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
export default {
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
          subtitle: "sold recently by Dave",

          imageSource: "../../assets/TradeShare.png",
        },
        {
          title: "Github",
          subtitle: "sold recently by Dave",

          imageSource: "../../assets/TradeShare.png",
        },
        {
          title: "Slack",
          subtitle: "sold recently by Dave",

          imageSource: "../../assets/TradeShare.png",
        },
        {
          title: "Twitter",
          subtitle: "sold recently by Dave",

          imageSource: "../../assets/TradeShare.png",
        },
      ],
    };
  },
};
</script>
