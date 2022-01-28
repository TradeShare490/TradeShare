<template>
  <v-card class="mx-4 mt-7 mb-5">
    <v-row class="py-5 justify-center">
      <v-col
        align-self="center"
        class="pl-5"
        cols="5"
        sm="4"
        md="2"
        lg="2"
        xl="2"
      >
        <v-avatar class="profile" color="grey" size="60%">
          <v-img src="https://randomuser.me/api/portraits/men/8.jpg" />
        </v-avatar>
      </v-col>

      <v-col
        align-self="center"
        cols="6"
        sm="4"
        md="2"
        lg="2"
        xl="2"
        class="text-left mx-0 px-0"
      >
        <v-list-item color="black" data-cy="basic-profile-info">
          <v-list-item-content>
            <v-list-item-title
              class="text-h6 text-xs-body-2 text-wrap font-weight-bold"
            >
              {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-subtitle-1">
              @{{ username }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-wrap">
              Member since {{ date }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-spacer class="hidden-sm-and-down" />
      <v-col
        align-self="center"
        cols="12"
        md="2"
        lg="4"
        xl="4"
        class="px-5 px-sm-0 px-md-0 px-lg-0 px-xl-0 mx-0"
      >
        <v-list-item-title class="font-weight-bold text-xs-caption">
          Bio
        </v-list-item-title>
        <v-list-item-subtitle
          class="text-wrap text-xs-caption"
          data-cy="profile-bio"
        >
          {{ bio }}
        </v-list-item-subtitle>
      </v-col>
      <v-spacer class="hidden-sm-and-down" />

      <v-col
        align-self="center"
        cols="9"
        sm="9"
        md="4"
        lg="3"
        xl="3"
        class="mx-10 pt-5 pt-sm-5 pt-md-0 pt-lg-0 pt-xl-0"
      >
        <v-row>
          <v-col cols="6" class="mx-0 px-0 pr-1 pb-0 mb-0">
            <v-list-item-title
              class="font-weight-bold"
              data-cy="profile-num-followers"
            >
              {{ numFollowers }}
            </v-list-item-title>
            <v-list-item-subtitle> Followers </v-list-item-subtitle>
            <v-btn
              block
              small
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
              small
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
          <v-col cols="6" class="mx-0 px-0 pl-1 pb-0 mb-0">
            <v-list-item-title
              class="font-weight-bold"
              data-cy="profile-num-following"
            >
              {{ numFollowing }}
            </v-list-item-title>
            <v-list-item-subtitle> Following </v-list-item-subtitle>
            <v-btn
              block
              small
              elevation="0"
              class="my-3 caption"
              color="primary"
              @click="message"
              data-cy="message"
            >
              Send a Message
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { useFollowMixin } from "../../hooks/useFollowMixin.js";
export default {
  name: "Profile",
  mixins: [useFollowMixin],
  data() {
    return {
      name: "Benver Vloshki",
      username: "benvloshki",
      date: "2021",
      bio: "This section is available for a small bio. Optional.",
      numFollowers: "11K",
      numFollowing: "5K",
      following: false,
    };
  },
  methods: {
    label() {
      console.log("assigning label...");
    },
    message() {
      console.log("sending a message...");
    },
  },
};
</script>
