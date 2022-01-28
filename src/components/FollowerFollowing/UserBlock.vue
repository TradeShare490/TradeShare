<template>
  <v-card elevation="0" class="px-6">
    <v-row no-gutters class="px-7">
      <v-col
        align-self="center"
        class="px-0 py-3"
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
        sm="6"
        md="6"
        lg="5"
        xl="5"
        class="text-left mx-0 px-2 mt-1 py-0"
      >
        <v-list-item color="black">
          <v-list-item-content class="py-1">
            <v-list-item-title
              class="
                name-text
                text-sm-body-1 text-caption text-wrap
                font-weight-bold
              "
            >
              {{ this.name }}
            </v-list-item-title>
            <v-list-item-title class="text-sm-body-3 text-caption text-wrap">
              @{{ this.username }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-spacer />
      <template v-if="request === false">
        <v-col
          cols="4"
          sm="3"
          md="2"
          lg="2"
          xl="2"
          align-self="center"
          class="mr-3"
        >
          <v-btn
            v-bind="size"
            elevation="2"
            outlined
            color="primary"
            v-if="following === true"
            @click="unfollow"
            class="btn my-3 caption font-weight-bold"
            data-cy="following"
            height="32px"
            width="110px"
          >
            <div class="text">Following</div>
          </v-btn>
          <v-btn
            v-bind="size"
            elevation="2"
            color="primary"
            v-if="following === false"
            @click="follow"
            class="btn my-3 caption font-weight-bold"
            data-cy="follow"
            height="32px"
            width="110px"
          >
            <div class="text">Follow</div>
          </v-btn>
        </v-col>
      </template>
      <template v-if="request === true">
        <v-col
          cols="3"
          sm="3"
          md="3"
          lg="2"
          xl="2"
          align-self="center"
          class="mr-3"
        >
          <v-btn
            v-bind="size"
            elevation="2"
            color="primary"
            @click="confirmFollowRequest"
            class="btn my-3 caption font-weight-bold"
            data-cy="follow"
            height="32px"
            width="110px"
          >
            <div class="text">CONFIRM</div>
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          sm="3"
          md="3"
          lg="2"
          xl="2"
          align-self="center"
          class="mr-3"
        >
          <v-btn
            v-bind="size"
            elevation="2"
            color="primary"
            outlined
            @click="rejectFollowRequest"
            class="btn my-3 caption font-weight-bold"
            data-cy="follow"
            height="32px"
            width="110px"
          >
            <div class="text">DELETE</div>
          </v-btn>
        </v-col>
      </template>
    </v-row>
    <v-divider />
  </v-card>
</template>

<script>
import { useFollowMixin } from "../../hooks/useFollowMixin.js";
export default {
  name: "UserBlock",
  mixins: [useFollowMixin],
  props: {
    currentlyFollowing: Boolean,
    name: String,
    image: String,
    username: String,
    requestBlock: Boolean,
  },
  data() {
    return {
      following: this.currentlyFollowing,
      request: this.requestBlock,
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
<style scoped>
.btn {
  border-radius: 3px;
  border-width: 2px;
  height: 5px;
}
.text {
  font-size: 1.1em;
}
</style>
