<template>
  <v-alert
    dismissible
    elevation="0"
    min-width="300"
    color="#f5f5f5"
    class="py-0"
    data-cy="notif-alert"
  >
    <v-row no-gutters class="mt-2">
      <v-icon class="mt-0 pb-1" large color="primary"> mdi-exclamation </v-icon>
      <v-col
        class="mt-0 pb-2"
        align-self="center"
        cols="3"
        sm="2"
        md="2"
        lg="1"
        xl="1"
      >
        <v-avatar data-cy="notif-profile-pic" class="profile" size="40">
          <v-img :src="image"></v-img>
        </v-avatar>
      </v-col>
      <v-col
        cols="1"
        sm="6"
        md="6"
        lg="5"
        xl="5"
        class="text-left mt-4 pb-1 ml-2"
      >
        <p
          class="
            text-wrap
            font-weight-bold
            text-sm-body-2
            text-md-body-2
            text-lg-body-2
            text-xl-body-2
            text-caption
          "
          data-cy="notif-message"
        >
          {{ message }}
        </p>
      </v-col>
      <v-spacer />
      <v-col
        sm="2"
        md="2"
        lg="1"
        xl="1"
        class="d-flex justify-end mr-5 pb-1"
        align-self="center"
      >
        <v-btn
          elevation="0"
          outlined
          color="primary"
          v-if="user.following == true"
          @click="unfollow"
          class="my-3 caption"
          small
          data-cy="notif-unfollow-button"
        >
          Following
        </v-btn>
        <v-btn
          small
          elevation="0"
          color="primary"
          v-if="user.following == false"
          @click="follow"
          class="my-3 caption"
          data-cy="notif-follow-button"
        >
          Follow
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { useFollowMixin } from "../../hooks/useFollowMixin.js";
export default {
  name: "FollowNotif",
  mixins: [useFollowMixin],
  props: {
    currentlyFollowing: Boolean,
    image: String,
    message: String,
    icon: String
  },
  data() {
    return {
      user: { following: this.currentlyFollowing }
    };
  },
};
</script>
