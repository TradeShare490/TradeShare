<template>
    <v-alert 
    type="info"
    dismissible
    color="primary"
    border="left"
    elevation="2"
    colored-border
    transition="fade-transition"
    icon=false>
        <v-row align='center'>
            <v-col>
              <v-avatar class="profile" size="50">
                <v-img 
                 :src="image"
                 max-height="75"
                 max-width="75">  
                </v-img> 
              </v-avatar>
   
            </v-col>
            
            <v-col>
                {{this.message}}
            </v-col>
            
            <v-col>
                <v-btn idth="250" height="45" color="primary" @click="follow()">Follow Back</v-btn>
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
    },
  } 
</script>