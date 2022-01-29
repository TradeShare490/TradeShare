<template>
  <div>
    <v-app-bar color="primary" dark app clipped-left>
      <v-img
        src="../../assets/TS_Logo_White.png"
        alt="TradeShare Logo"
        contain
        max-width="70px"
        height="60px"
        position="left"
      />
      <v-toolbar-title class="text-h6 mr-6 hidden-sm-and-down">
        TradeShare
      </v-toolbar-title>
      <v-spacer />
      <v-autocomplete
        v-model="searchModel"
        class="shrink mr-3 mt-6"
        :items="items"
        :search-input.sync="search"
        :loading="isLoading"
        item-text="Description"
        hide-selected
        hide-no-data
        label="Search"
        append-icon="mdi-magnify"
        light
        rounded
        dense
        single-line
        solo
        data-cy="autocomplete-search-bar"
      >
        <template v-slot:item="data">
          <v-list-item
            class="text-left text-body-2"
            @click="redirect(data.item['1. symbol'])"
            data-cy="autocomplete-list-item"
            v-if="!searchModeUsers"
          >
            <strong>{{ data.item["1. symbol"] }}:</strong> &nbsp;
            {{ data.item["2. name"] }}
          </v-list-item>
          <v-list-item class="text-left text-body-2" v-if="searchModeUsers">
            {{ data.item }}
          </v-list-item>
        </template>
      </v-autocomplete>
      <v-btn icon class="mt-1">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon @click="submit" class="mt-1" data-cy="logout-btn">
        <v-icon> mdi-logout </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { logout } from "../../hooks/useCredential.js";
import axios from "../../axios/axios.v1";
export default {
  name: "NavBar",
  data() {
    return {
      stocks: [],
      people: ["@Kevin", "@George", "@Alya", "@Siobhan"],
      searchModeUsers: false,
      isLoading: false,
      searchModel: null,
      search: null,
      searchQueue: [],
    };
  },
  computed: {
    fields() {
      if (!this.searchModel) return [];
      return Object.keys(this.searchModel).map((key) => {
        return {
          key,
          value: this.searchModel[key] || "n/a",
        };
      });
    },
    items() {
      if (this.searchModeUsers) {
        return this.people;
      } else {
        return this.stocks.map((stock) => {
          const Description = stock["1. symbol"] + ": " + stock["2. name"];
          return Object.assign({}, stock, { Description });
        });
      }
    },
  },
  methods: {
    submit() {
      logout(this.$store, this.$router);
    },
    redirect(symbol) {
      const regex = /^\S+$/;
      if (regex.test(symbol)) {
        window.open("https://finance.yahoo.com/quote/" + symbol);
      }
      return true;
    },
  },
  watch: {
    async search(val) {
      // Checks if the user has typed anything in the last 2 seconds if not make a request to backend
      if (val?.charAt(0) === "@") {
        console.log("Username mode");
        this.searchModeUsers = true;
      } else {
        this.searchModeUsers = false
        this.searchQueue.push(val);
        await new Promise((_) => setTimeout(_, 2000));
        this.searchQueue.pop();
        if (this.searchQueue.length === 0) {
          if (val?.length === 0) {
            return;
          }
          if (this.isLoading) {
            return;
          }

          this.isLoading = true;

          // Lazily load input items
          axios
            .get(`/searchRecommendations/${val}`)
            .then((res) => {
              this.stocks = res.data["searchResult"]["bestMatches"];
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => (this.isLoading = false));
        }
      }
    },
  },
};
</script>
