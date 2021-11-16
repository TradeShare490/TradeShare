<template>
  <v-container fluid fill-height class="pa-0 d-flex justify-center align-center">
    <v-row class="no-gutters" style="overflow: hidden">
      <v-col
        cols="12"
        sm="5"
        md="4"
        lg="4"
        xl="4"
        class="flex-grow-1 flex-shrink-0"
        style="border-right: 1px solid #0000001f;"
      >
        <v-row class="py-5">
          <v-col cols="12" align-self="center" class="py-0 pt-2">
            <p class="primary--text font-weight-medium">Messages</p>
            <v-divider />
          </v-col>
          <v-col cols="12" align-self="center" class="py-0 pt-5">
            <v-autocomplete
              dense
              class="mx-4 text-body-2"
              flat
              hide-no-data
              hide-details
              label="Search for people and messages"
              outlined
              color="primary"
              hide-selected
              single
              line
              return-object
              single-line
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" class="px-7">
            <v-btn small color="primary" width="100%">
              <v-icon left>
                mdi-pencil
              </v-icon>
              New Message
            </v-btn>
          </v-col>
        </v-row>
        <v-divider />
        <v-responsive class="overflow-y-auto fill-height" height="65vh">
          <v-list subheader>
            <v-list-item-group v-model="activeChat">
              <div v-for="(user, index) in users" :key="user.id">
                <v-list-item :key="`user${index}`" :value="user.id">
                  <v-avatar class="profile" size="40">
                    <v-img :src="user.img"></v-img>
                  </v-avatar>
                  <v-list-item-content class="text-left pl-5">
                    <v-col class="px-0 py-0" cols="6">
                      <v-list-item-title
                        v-text="user.name"
                        class="text-wrap text-body-2"
                      />
                    </v-col>
                    <v-col class="px-0 py-0" cols="6">
                      <v-list-item-subtitle
                        v-text="user.timeLastMessage"
                        class="text-wrap text-right text-caption"
                      />
                    </v-col>
                    <v-list-item-subtitle
                      v-text="user.lastMessage"
                      class="pt-2 text-caption"
                    />
                  </v-list-item-content>
                </v-list-item>
                <v-divider :key="`chatDivider${index}`" class="my-0" />
              </div>
            </v-list-item-group>
          </v-list>
        </v-responsive>
      </v-col>

      <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
         <v-row v-if="activeChat" class="pl-3" v-on:change="$vuetify.goTo(9999)">
              <v-col cols="1" class="pt-5">
                <v-avatar class="profile" size="40">
                  <v-img
                    src="https://randomuser.me/api/portraits/men/52.jpg"
                  ></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="6">
                <v-card-title class="text-body-1">
                  John Doe
                </v-card-title>
              </v-col>
            </v-row>
            <v-divider v-if="activeChat" />
        <v-responsive
          v-if="activeChat"
          class="overflow-y-hidden fill-height"
          height="80vh"
        >
          <v-card flat class="d-flex flex-column fill-height">
            <v-card-text class="flex-grow-1 overflow-y-auto">
              <div
                v-for="msg in messages"
                :key="msg"
                :class="{ 'd-flex justify-start': !msg.me }"
              >
                <div :class="{ 'd-flex flex-row-reverse': msg.me }">
                  <v-menu offset-y>
                    <template v-slot:activator="{}">
                      <!-- needed for messages to be displayed -->
                      <v-chip
                        style="height: auto; white-space: normal; max-width: 360px;"
                        class="px-4 py-2 mb-2 black--text text-left"
                        :outlined="msg.me ? false : true"
                      >
                        {{ msg.content }}
                      </v-chip>
                    </template>
                  </v-menu>
                </div>
              </div>
            </v-card-text>
            <v-card-text class="flex-shrink-1">
              <v-text-field
                v-model="messageForm.content"
                label="Send a message..."
                type="text"
                no-details
                outlined
                @keyup.enter="messages.push(messageForm)"
                hide-details
                single-line
              >
                <template v-slot:prepend-inner>
                  <v-icon @click="click" class="mr-2" color="primary">insert_emoticon</v-icon>
                </template>
                <template v-slot:append>
                  <v-icon class="px-2" @click="click" color="primary">image</v-icon>
                  <v-icon @click="messages.push(messageForm)" color="primary">send</v-icon>
                </template>
              </v-text-field>
            </v-card-text>
          </v-card>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "MessagesComponent",
    props: {
      image: String,
    },
    data: () => ({
      activeChat: 1,
      users: [
        {
          id: 1,
          name: "John Doe",
          active: false,
          img: "https://randomuser.me/api/portraits/men/52.jpg",
          lastMessage: "What are you up to today?",
          timeLastMessage: "5m",
        },
        {
          id: 2,
          name: "Jane Doe",
          active: false,
          img: "https://randomuser.me/api/portraits/women/45.jpg",
          lastMessage:
            "I couldn't believe it when I saw he had bought it. I really didn't expect that from him.",
          timeLastMessage: "2w",
        },
        {
          id: 3,
          name: "Scarlett Hienm",
          active: false,
          img: "https://randomuser.me/api/portraits/women/17.jpg",
          lastMessage: "Good idea",
          timeLastMessage: "Oct 12, 2021",
        },
      ],
      messages: [
        {
          content: "Hey! How have you been",
          me: true,
        },
        {
          content: "Yoooo, I've been good, you?",
          me: false,
        },
        {
          content: "I've been sooo busy lately",
          me: false,
        },
        {
          content: "I'm good, tired as per usual",
          me: true,
        },
        {
          content: "What's kept you busy?",
          me: true,
        },
        {
          content: "This new project I took on, man is it time consuming. I thought it was going to be a lot easier...",
          me: false,
        },
        {
          content: "Rip, I hope it's fun at least",
          me: true,
        },
        {
          content: "Rip, I hope it's fun at least",
          me: true,
        },
        {
          content: "Rip, I hope it's fun at least",
          me: true,
        },
        {
          content: "Rip, I hope it's fun at least",
          me: true,
        },
        {
          content: "Rip, I hope it's fun at least",
          me: true,
        },
        {
          content: "Rip, I hope it's fun at least",
          me: true,
        },
        {
          content: "Rip, I hope it's fun at least",
          me: true,
        },
      ],
      messageForm: {
        content: "",
        me: true,
      },
    }),
     methods: {
      click () {
        alert('You clicked the icon!')
      },
    },
  };
</script>
