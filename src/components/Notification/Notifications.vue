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
    icon="../assets/logo.png"> <!-- Eventually here we're going to have to find a way to make it so that the icon is the users profile pic -->
        <v-row align='center'>
            <v-col>
                <v-img 
                 src="{{profilePic}}"
                 max-height="100"
                 max-width="100">  
                </v-img>    
            </v-col>
            
            <v-col>
                {{name}} has now followed you
            </v-col>
            
            <v-col>
                <v-btn color="blue" @click="follow()">Follow Back</v-btn>
            </v-col>
        <v-row>

    </v-alert>
</template>