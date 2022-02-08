<template>
  <v-container class="px-0">
    <v-row style="overflow: hidden">
      <v-col cols="12" align-self="center" class="py-0 pt-5">
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
          append-icon="mdi-magnify"
          data-cy="search"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" align-self="center" class="px-8 pb-6">
        <v-btn small color="primary" width="100%" data-cy="new-message">
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
        <v-list-item
          v-for="user in chats"
          v-bind:key="user.name"
          :to="/messages/ + user.id"
          data-cy="chat"
          class="px-0"
          @click="
            conversationSelected(
              user.name,
              user.username,
              user.img,
              user.messages
            )
          "
        >
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
              <v-col class="px-0 py-0">
                <v-list-item-subtitle
                  v-text="user.lastMessage"
                  class="pt-2 text-caption text-truncate"
                  style="max-width: 19vw;"
                />
              </v-col>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>
      </v-list>
    </v-responsive>
  </v-container>
</template>

<script>
  export default {
    methods: {
      conversationSelected(name, username, img, messages) {
        this.$emit("clicked", name, username, img, messages);
      },
    },
    computed: {
      chats() {
        return [
          {
            id: 1,
            name: "John Doe",
            username: "@johndoe",
            img: "https://randomuser.me/api/portraits/men/52.jpg",
            lastMessage: "What are you up to today?",
            timeLastMessage: "5m",
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
                content:
                  "This new project I took on, man is it time consuming. I thought it was going to be a lot easier...",
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
          },
          {
            id: 2,
            name: "Jane Doe",
            username: "@janedoe",
            img: "https://randomuser.me/api/portraits/women/45.jpg",
            lastMessage:
              "I couldn't believe it when I saw he had bought it. I really didn't expect that from him.",
            timeLastMessage: "2w",
            messages: [
              {
                content: "Are you planning on going to the party on Friday?",
                me: true,
              },
              {
                content: "Not sure yet",
                me: false,
              },
            ],
          },
          {
            id: 3,
            name: "Scarlett Hienm",
            username: "@scarlettehienm",
            img: "https://randomuser.me/api/portraits/women/17.jpg",
            lastMessage: "Good idea",
            timeLastMessage: "Oct 12, 2021",
            messages: [
              {
                content: "Happy thanksgiving! How are you?",
                me: true,
              },
              {
                content: "Thanks! I'm good you?",
                me: false,
              },
              {
                content: "Tired of work tbh",
                me: false,
              },
              {
                content: "Oh yeah? Why's that?",
                me: true,
              },
              {
                content: "What's kept you busy?",
                me: true,
              },
              {
                content: "The project I'm working on is taking forever",
                me: false,
              },
              {
                content: "Sorry to hear that",
                me: true,
              },
            ],
          },
        ];
      },
    },
  };
</script>
