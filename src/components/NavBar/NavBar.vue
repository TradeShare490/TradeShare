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
      ></v-img>
      <v-toolbar-title class="text-h6 mr-6 hidden-sm-and-down">
        TradeShare
      </v-toolbar-title>
      <v-spacer />
        <v-autocomplete
          label="Search"
          append-icon="mdi-magnify"
          class="shrink mr-3"
          :items="stocks"
          :loading="isLoading"
          :item-text="item => item['symbol'] +': '+ item['name']"
          rounded
          single-line
          solo
          dense
          light
          hide-details
          hide-no-data
          clearable
          click:clear
        >
          <template v-slot:item="data">
            <v-list-tile-content
            v-on:click="redirect(data.item['symbol'])"
            >
              <v-list-tile-title ><strong>{{ data.item['symbol'] }}</strong>: {{ data.item['name'] }}</v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-autocomplete>

      <v-btn icon class="mt-1">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon @click="logOut" class="mt-1" data-cy="logout-btn">
        <v-icon> mdi-logout </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      stocks: [
        {"symbol": "AAPL", "name": "Apple Inc."}, {"symbol": "TSLA", "name": "Tesla Inc."}, {"symbol": "FSR", "name": "Fisker Inc."}, {"symbol": "SPI", "name": "Spi Energy Co Ltd"}
      ],
      isLoading: false
    };
  },
  computed: {
    items () {
      return null
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ name: "Login" });
      });
    },
    redirect(symbol){
      const regex = /^\S+$/;
      if(regex.test(symbol)){
        window.open("https://finance.yahoo.com/quote/"+symbol);
        }
    }
  },
};
</script>

<style lang="scss">
@import "~../../scss/variables.scss";
</style>