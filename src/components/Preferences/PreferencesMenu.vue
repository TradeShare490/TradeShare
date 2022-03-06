<template>
  <v-card>
    <v-navigation-drawer
      permanent
      fixed
      absolute
      clipped
      height="100vh"
      :mini-variant="mini"
    >
      <v-list-item class="hidden-sm-and-down">
        <v-list-item-content class="mt-2 text-left">
          <v-list-item-title
            class="font-weight-bold"
            style="color: #66788A"
          >
            PREFERENCES
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="my-1 hidden-sm-and-down" />
      <v-list
        dense
        nav
      >
        <v-list-item-group
          v-model="selectedPreferenceItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in navItems"
            :key="i"
            :to="item.route"
            active-class="active"
            data-cy="menu"
          >
            <v-list-item-icon>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: 'PreferencesMenu',
  data () {
    return {
      selectedPreferenceItem: '',
      navItems: [
        { title: 'Account', icon: 'mdi-account', route: '/preferences/account' },
        { title: 'Notifications', icon: 'mdi-bell-badge-outline', route: '/preferences/notifications' },
        { title: 'Privacy & Security', icon: 'mdi-security', route: '/preferences/privacysecurity' },
        { title: 'Display, Language & Region', icon: 'mdi-translate', route: '/preferences/dlr' }
      ]
    }
  },
  computed: {
    mini () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
