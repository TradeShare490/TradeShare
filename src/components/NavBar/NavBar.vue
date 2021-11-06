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
        rounded
        solo
        dense
        light
        hide-details
        hide-no-data
      >
      </v-autocomplete>
      <v-btn icon class="mt-1">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon @click="logOut" class="mt-1">
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({}),
  methods: {
    logOut() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>

<style lang="scss">
  @import "~../../scss/variables.scss";
</style>