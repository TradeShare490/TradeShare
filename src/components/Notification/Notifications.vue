<template>
  <v-alert dismissible elevation="0" min-width="300" color="#f5f5f5">
    <v-row no-gutters class="mt-2">
      <v-col  class = "mt-0" align-self="start"
        xs="12"
        sm="2"
        md="2"
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
        xs="12"
        sm="4"
        md="6"
        lg="5"
        xl="5"
        class="text-left mt-3 pb-1 ml-2"
      >
        <p class="text-wrap font-weight-bold text-sm-body-2 text-md-body-2 text-lg-body-2 text-xl-body-2 text-caption">
          {{message}}
        </p>
      </v-col>
      <v-spacer/>
      
      <v-col sm="2" md="2" lg="5" xl="5" class="d-flex justify-end mr-5 pb-1 align-self="center">
        <v-btn
          elevation="0"
          outlined
          color="primary"
          v-if="following == true"
          @click="unfollow"
          class="my-3 caption"
          small
        >
          Following
        </v-btn>
        <v-btn
          small
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
  </v-alert>
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
  } 
</script>