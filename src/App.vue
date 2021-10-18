<template>
  <v-app>
      <SideMenu v-if="loggedIn" />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SideMenu from "./components/SideMenu/SideMenu.vue";

export default {
  name: "App",
  data() {
    return {
      noSideMenu: ["Login", "SignUp", "BrokerageSignUp"],
    };
  },
  components: {
    SideMenu,
  },
  computed: {
    loggedIn() {
      //temporary solution
      return !this.noSideMenu.includes(this.$route.name);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>