<template>
  <v-navigation-drawer app clipped permanent :mini-variant="mini">
    <v-list-item class="hidden-sm-and-down" data-cy="profile">
      <v-list-item-content>
        <v-list-item-avatar class="avatar" size="40%">
          <v-img src="https://randomuser.me/api/portraits/men/1.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title class="mt-3">
          {{ user.firstname + " " + user.lastname }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-caption grey--text">{{
          since
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="my-3 hidden-sm-and-down"></v-divider>

    <v-list dense nav>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="item in upperNav"
          :key="item.title"
          :to="item.route"
          active-class="active"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider class="my-3"></v-divider>

    <v-list dense nav>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="item in lowerNav"
          :key="item.title"
          :to="item.route"
          active-class="active"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: "",
      upperNav: [
        {
          title: "Home",
          icon: "mdi-home",
          route: "/news-feed",
        },
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
