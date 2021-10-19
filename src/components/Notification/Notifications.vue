<template>
  <v-card class="px-10">
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
        <v-icon large color="primary">
          mdi-exclamation
        </v-icon>
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
       {{this.message}}
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
    name: "FollowNotif",
    props: {
      currentlyFollowing: Boolean,
      currentLabelText: String,
      currentLabelColor: String,
      image: String,
      message: String,
      icon: String
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
        console.log("following...");
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
  } 
</script>