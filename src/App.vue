<template>
  <v-app>
    <v-main>
      <SideMenu v-if="loggedIn" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SideMenu from "./components/SideMenu/SideMenu.vue";

export default {
  name: "App",
  components: {
    SideMenu,
  },
  computed: {
    loggedIn() {
      //temporary solution
      return !(this.$route.name === "Login" || this.$route.name === "SignUp");
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