<template>
  <v-card elevation = 0 class="px-10">
    <v-row no-gutters>
      <v-col  align-self="left"
        class="px-0 py-5"
        cols="auto"
        sm="auto"
        md="auto"
        lg="auto"
        xl="auto">
        <v-icon large color="primary">
          mdi-exclamation
        </v-icon>
      </v-col>

      <v-col
        align-self="left"
        class="px-0 py-5"
        cols="auto"
        sm="auto"
        md="auto"
        lg="auto"
        xl="auto"
      >
        <v-avatar class="profile" size="50">
          <v-img :src="image"></v-img>
        </v-avatar>
      </v-col>
      <v-col
        align-self="center"
        cols="auto"
        sm="auto"
        md="auto"
        lg="auto"
        xl="auto"
        class="text-left mx-0 px-0 mt-3 py-0"
      >
              <v-list-item color="black">
          <v-list-item-content class="py-1">
            <v-list-item-title
              class="text-sm-body-2 text-md-body-2 text-lg-body-2 text-xl-body-2 text-caption text-wrap"
              >{{ message }}</v-list-item-title>
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
        >
          Following
        </v-btn>
        <v-btn
          block
          v-bind="size"
          elevation="0"
          color="primary"
          v-if="following == false"
          @click="follow()"
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
      unfollow(){
        this.following = false;
        console.log("unfollowing");
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