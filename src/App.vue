<template>
  <v-app>
    <v-main>
      <NavBar v-if="loggedIn" />
      <SideMenu v-if="loggedIn" />
      <preferences-menu v-if="showMenu" />
      <v-content
        v-if="showMenu"
        style="padding-top: 0px"
      >
        <router-view />
      </v-content>
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script>
import SideMenu from './components/SideMenu/SideMenu.vue'
import NavBar from './components/NavBar/NavBar.vue'
import PreferencesMenu from './components/Preferences/PreferencesMenu.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    SideMenu,
    PreferencesMenu
  },
  data () {
    return {
      noSideMenu: ['Login', 'SignUp', 'BrokerageSignUp', 'Confirm'],
      showPreferencesMenu: ['Preferences', 'AccountPreferences', 'NotificationsPreferences', 'PrivacySecurityPreferences', 'DLRPreferences']
    }
  },
  computed: {
    loggedIn () {
      return !this.noSideMenu.includes(this.$route.name)
    },
    showMenu () {
      return this.showPreferencesMenu.includes(this.$route.name)
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
  width: 100vw;
}
</style>
