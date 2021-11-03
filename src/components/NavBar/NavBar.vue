<template>
  <div>
    <v-app-bar color="primary" dark app clipped-left>
      <v-row>
        <v-col>
          <v-img
            src="../../assets/TS_Full_Logo_White.png"
            alt="TradeShare Logo"
            contain
            height="60px"
            position="left"
          ></v-img>
        </v-col>
        <v-col class="d-flex justify-space-around">
          <v-autocomplete
            label="Search"
            append-icon="mdi-magnify"
            class="shrink pt-2"
            rounded
            solo
            dense
            light
            hide-details
            hide-no-data
          >
          </v-autocomplete>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn icon class="mt-1">
            <v-icon>mdi-bell</v-icon>
          </v-btn>

          <v-btn icon @click="logOut" class="mt-1">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-col>
      </v-row>
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