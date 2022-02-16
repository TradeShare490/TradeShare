<template>
  <v-app>
    <v-main>
      <NavBar v-if="loggedIn" />
      <SideMenu v-if="loggedIn" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SideMenu from './components/SideMenu/SideMenu.vue'
import NavBar from './components/NavBar/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    SideMenu
  },
  data () {
    return {
      noSideMenu: ['Login', 'SignUp', 'BrokerageSignUp', 'Confirm']
    }
  },
  computed: {
    loggedIn () {
      return !this.noSideMenu.includes(this.$route.name)
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F7F7F7;
}
</style>
