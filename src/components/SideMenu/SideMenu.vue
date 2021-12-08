<template>
  <v-card>
    <v-navigation-drawer app clipped permanent :mini-variant="mini">
      <v-list-item class="hidden-sm-and-down" data-cy="profile">
        <v-list-item-content class="mb-0 pb-0">
          <v-list-item-avatar class="avatar" size="40%">
            <v-img src="https://randomuser.me/api/portraits/men/1.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-title class="mt-3" data-cy="user-name">
            {{ user.firstname + " " + user.lastname }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ since }}
          </v-list-item-subtitle>
          <v-container class="mb-0 pb-0 mx-0 px-0">
            <v-row no-gutters>
              <v-col>
                <a 
                  href="/following"
                  class="black--text font-weight-bold"
                  style="text-decoration: none; font-size: 12px"
                >
                  19 Following
                </a>
              </v-col>
              <v-col>
                <a
                  href="/followers"
                  class="black--text font-weight-bold"
                  style="text-decoration: none; font-size: 12px"
                >
                  29 Followers
                </a>
              </v-col>
            </v-row>
          </v-container>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider class="my-3 hidden-sm-and-down" />

      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="primary">
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

      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="item in lowerNav"
            :key="item.title"
            :to="item.route"
            active-class="active"
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
      
      <template v-slot:append>
        <v-container>
          <v-row no-gutters>
            <v-col>
              <!-- INSERT HREF HERE -->
              <a
                href="/"
                class="grey--text"
                style="text-decoration: none; font-size: 12px"
              >
                Terms & Conditions
              </a>
            </v-col>
            <v-col>
              <!-- INSERT HREF HERE -->
              <a
                href="/"
                class="grey--text"
                style="text-decoration: none; font-size: 12px"
              >
                Privacy Policy
              </a>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="text-center text-caption">
              <v-icon size="17">
                mdi-copyright
              </v-icon>
              <span>TradeShare</span>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        selectedItem: "",
        upperNav: [
          {
            title: "Trade Zone",
            icon: "mdi-home",
            route: "/tradezone",
          },
          {
            title: "Dashboard",
            icon: "mdi-view-dashboard",
            route: "/dashboard",
          },
          { title: "Messages", icon: "mdi-forum", route: "/messages" },
          {
            title: "Preferences",
            icon: "mdi-lock-open-outline ",
            route: "/preferences",
          },
          {
            title: "Connected Apps",
            icon: "mdi-dots-grid ",
            route: "/icons-and-images",
          },
        ],
        lowerNav: [
          {
            title: "Support",
            icon: "mdi-help-circle-outline",
            route: "/support",
          },
        ],
        name: "Roman Kutepov",
        since: "Member since 2021",
      };
    },
    computed: {
      mini() {
        return this.$vuetify.breakpoint.smAndDown;
      },
      user() {
        let user = JSON.parse(localStorage.getItem("user"));
        return user["userInfo"];
      },
    },
  };
</script>

<style>
.avatar {
  flex-direction: column;
}
.active {
  border-width: 0px;
  border-left-width: 3px;
  border-style: solid;
}
</style>
