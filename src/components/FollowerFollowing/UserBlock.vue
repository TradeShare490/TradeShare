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
        class="text-left text-body-2"
      > {{ this.name }}
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
import {useFollowMixin} from "../../mixins/useFollowMixin.js";
export default {
  
  name: "UserBlock",
  mixins: [useFollowMixin],
  props: {
    currentlyFollowing: Boolean,
    name: String,
    image: String,
  },
  data() {
    return {
      following: this.currentlyFollowing,
    };
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
