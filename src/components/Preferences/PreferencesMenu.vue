<template>
  <v-card>
    <v-navigation-drawer
      permanent
      absolute
      height="100vh"
    >
      <v-list-item>
        <v-list-item-content class="mt-2 text-left">
          <v-list-item-title
            class="font-weight-bold"
            style="color: #66788A"
          >
            PREFERENCES
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="my-1" />
      <v-list
        dense
        nav
      >
        <v-list-item-group
          v-model="selectedPreferenceItem"
          color="primary"
        >
          <v-list-item
            v-for="(option, i) in navItems"
            :key="i"
            :to="option.route"
            active-class="active"
            data-cy="menu"
          >
            <v-list-item-content>
              <v-list-item-title
                class="text-left"
                style="color: #66788A"
              >
                {{ option.title }}
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
        { title: 'Account', route: '/preferences/account' },
        { title: 'Notifications', route: '/preferences/notifications' },
        { title: 'Privacy & Security', route: '/preferences/privacysecurity' },
        { title: 'Display, Language & Region', route: '/preferences/dlr' }
      ]
    }
  }
}
</script>
