<template>
  <v-card elevation="0" class="px-10">
    <v-row no-gutters>
      <v-col
        align-self="center"
        class="px-0 py-5"
        cols="2"
        sm="2"
        md="1"
        lg="1"
        xl="1"
      >
        <v-avatar class="profile" size="50">
          <v-img :src="image"></v-img>
        </v-avatar>
      </v-col>
      <v-col
        align-self="center"
        cols="6"
        sm="3"
        md="3"
        lg="3"
        xl="3"
        class="text-left mx-0 px-0 mt-3 py-0"
      >
        <v-list-item color="black">
          <v-list-item-content class="py-1">
            <v-list-item-title
              class="text-sm-body-2 text-md-body-2 text-lg-body-2 text-xl-body-2 text-caption text-wrap"
              >{{ this.name }}</v-list-item-title
            >
            <v-list-item-title
                class="text-sm-body-2 text-md-body-2 text-lg-body-2 text-xl-body-2 text-caption text-wrap"
            >@{{this.username}}</v-list-item-title
            >
          </v-list-item-content>

        </v-list-item>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4" sm="3" md="2" lg="2" xl="2" align-self="center">
        <v-btn
          block
          v-bind="size"
          elevation="0"
          outlined
          color="primary"
          v-if="following == true"
          @click="unfollow"
          class="my-3 caption"
          data-cy="following"
        >
          Following
        </v-btn>
        <v-btn
          block
          v-bind="size"
          elevation="0"
          color="primary"
          v-if="following == false"
          @click="follow"
          class="my-3 caption"
          data-cy="follow"
        >
          Follow
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
  export default {
    name: "UserBlock",
    props: {
      currentlyFollowing: Boolean,
      currentLabelText: String,
      currentLabelColor: String,
      name: String,
      image: String,
      username: String,
    },
    data() {
      return {
        following: this.currentlyFollowing,
        labelText: this.currentLabelText,
        labelColor: this.currentLabelColor,
      };
    },
    methods: {
      follow() {
        this.following = true;
        this.labelText = "untagged";
        this.labelColor = "untagged";
      },
      unfollow() {
        this.following = false;
      },
    },
    computed: {
      size() {
        const size = {
          xs: "x-small",
          sm: "small",
          md: "small",
          lg: "small",
          xl: "small",
        }[this.$vuetify.breakpoint.name];
        return size ? { [size]: true } : {};
      },
    },
  };
</script>
