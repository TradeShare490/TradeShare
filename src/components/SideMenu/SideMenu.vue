<template>
  <v-container>
    <v-card height="400" width="256">
      <v-navigation-drawer permanent>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/men/1.jpg"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-title class="text-h6"> {{ name }} </v-list-item-title>
            <v-list-item-subtitle> {{ since }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item
            v-for="item in upperNav"
            :key="item.title"
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item v-for="item in lowerNav" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      upperNav: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
        },
        {
          title: "Followers",
          icon: "mdi-account-multiple-outline",
          route: "/followers",
        },
        {
          title: "Following",
          icon: "mdi-account-supervisor-circle-outline ",
          route: "/following",
        },
        { title: "Messages", icon: "mdi-forum", route: "/messages" },
        {
          title: "Preferences",
          icon: "mdi-lock-open-outline ",
          route: "/preferences",
        },
        {
          title: "Icons & Images",
          icon: "mdi-image-outline ",
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
};
</script>

<style>
.container {
  padding: 0px;
}
</style>