<template>
  <v-card>
    <v-navigation-drawer
      app
      clipped
      permanent
      :mini-variant="mini"
    >
      <v-list-item
        class="hidden-sm-and-down"
        data-cy="profile"
      >
        <v-list-item-content class="mb-0 pb-0">
          <v-list-item-avatar
            size="55%"
            style="flex-direction: column;"
          >
            <v-img src="https://randomuser.me/api/portraits/men/1.jpg" />
          </v-list-item-avatar>
          <v-list-item-title
            class="mt-3"
            data-cy="user-name"
          >
            {{ user.firstname + " " + user.lastname }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption black--text ">
            @{{ user.username }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ since }}
          </v-list-item-subtitle>
          <v-container class="mb-0 pb-0 mx-0 px-0">
            <v-row no-gutters>
              <v-col>
                <router-link
                  to="/following"
                  class="black--text font-weight-bold"
                  style="text-decoration: none; font-size: 12px"
                >
                  {{ followingNum + " Followings" }}
                </router-link>
              </v-col>
              <v-col>
                <router-link
                  to="/followers"
                  class="black--text font-weight-bold"
                  style="text-decoration: none; font-size: 12px"
                >
                  {{ followerNum + " Followers" }}
                </router-link>
              </v-col>
            </v-row>
          </v-container>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="my-3 hidden-sm-and-down" />
      <v-list
        dense
        nav
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="item in upperNav"
            :key="item.title"
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
      <v-divider class="my-3" />
      <v-list
        dense
        nav
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="item in lowerNav"
            :key="item.title"
            :to="item.route"
            active-class="border-width: 0px; border-left-width: 3px; border-style: solid;"
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
      <template #append>
        <v-container class="hidden-sm-and-down">
          <v-row no-gutters>
            <v-col>
              <!-- INSERT REF HERE -->
              <router-link
                to="/"
                class="grey--text ml-1"
                style="text-decoration: none; font-size: 12px"
              >
                Terms &amp; Conditions
              </router-link>
            </v-col>
            <v-col>
              <!-- INSERT REF HERE -->
              <router-link
                to="/"
                class="grey--text"
                style="text-decoration: none; font-size: 12px"
              >
                Privacy Policy
              </router-link>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="text-center text-caption mt-1  grey--text ">
              <v-icon size="17">
                mdi-copyright
              </v-icon>
              <span class="grey--text text--darken-2 font-weight-bold">TradeShare</span>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import UserService from '../../services/User.service'
export default {
  name: 'SideMenu',
  data () {
    return {
      selectedItem: '',
      upperNav: [
        { title: 'Trade Zone', icon: 'mdi-target-variant', route: '/tradezone' },
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/dashboard' },
        { title: 'Messages', icon: 'mdi-forum', route: '/messages/0' },
        { title: 'Preferences', icon: 'mdi-lock-open-outline ', route: '/preferences/account' },
        { title: 'Connected Apps', icon: 'mdi-apps ', route: '/connected-apps' }
      ],
      lowerNav: [
        { title: 'Support', icon: 'mdi-help-circle-outline', route: '/support' }
      ],
      since: 'Member since 2021'
    }
  },
  computed: {
    mini () {
      return this.$vuetify.breakpoint.smAndDown
    },
    user () {
      return JSON.parse(localStorage.getItem('user'))
    },
    followingNum () {
      if (!this.$store.state.user.following) return 0
      else return this.$store.state.user.following.length
    },
    followerNum () {
      if (!this.$store.state.user.followers) return 0
      else return this.$store.state.user.followers.length
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.account = await UserService.getAccount(this.user.userId)
    }
  }
}
</script>
