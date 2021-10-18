<template>
    <v-alert 
    prominent
    dismissible
    v-model="alert"
    color="cyan"
    border="left"
    elevation="2"
    colored-border
    transition="fade-transition"
    icon="../assets/TradeShare.png"> <!-- Eventually here we're going to have to find a way to make it so that the icon is the users profile pic -->
        <v-row align='center'>
            <v-col>
                <v-img 
                 :src="image"
                 max-height="100"
                 max-width="100">  
                </v-img>    
            </v-col>
            
            <v-col>
                {{this.message}}
            </v-col>
            
            <v-col>
                <v-btn color="blue" @click="follow()">Follow Back</v-btn>
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
      message: String
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