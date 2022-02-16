<template>
  <v-container class="px-0">
    <v-row style="overflow: hidden">
      <v-col
        cols="12"
        align-self="center"
        class="py-0 pt-5"
      >
        <p class="primary--text font-weight-medium">
          Messages
        </p>
        <v-divider />
      </v-col>
      <v-col
        cols="12"
        align-self="center"
        class="py-0 pt-5"
      >
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
        />
      </v-col>
      <NewMessage />
    </v-row>
    <v-divider />
    <v-responsive
      class="overflow-y-auto fill-height"
      height="65vh"
    >
      <v-list subheader>
        <v-list-item
          v-for="(user, i) in chats"
          :key="i"
          :to="/messages/ + user.id"
          data-cy="chat"
          class="px-0"
          @click="
            conversationSelected(
              user.name,
              user.username,
              user.img,
              user.messages,
            )"
        >
          <v-list-item
            :key="`user${i}`"
            :value="user.id"
          >
            <v-avatar
              class="profile"
              size="40"
            >
              <v-img :src="user.img" />
            </v-avatar>
            <v-list-item-content class="text-left pl-5">
              <v-col
                class="px-0 py-0"
                cols="6"
              >
                <v-list-item-title
                  class="text-wrap text-body-2"
                  v-text="user.name"
                />
              </v-col>
              <v-col
                class="px-0 py-0"
                cols="6"
              >
                <v-list-item-subtitle
                  class="text-wrap text-right text-caption"
                  v-text="user.timeLastMessage"
                />
              </v-col>
              <v-col class="px-0 py-0">
                <v-list-item-subtitle
                  class="pt-2 text-caption text-truncate"
                  style="max-width: 19vw;"
                  v-text="user.lastMessage"
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
import NewMessage from "../Messages/NewMessage.vue";
export default {
  name: 'ChatMenu',
  components: {
    NewMessage,
  },
  computed: {
    chats () {
      return [
        {
          id: 1,
          name: 'John Doe',
          username: '@johndoe',
          img: 'https://randomuser.me/api/portraits/men/52.jpg',
          lastMessage: 'What are you up to today?',
          timeLastMessage: '5m',
          messages: [
            {
              content: 'Hey! How have you been',
              me: true,
              timestamp: '2022-02-10 15:10:03'
            },
            {
              content: "Yoooo, I've been good, you?",
              me: false,
              timestamp: '2022-02-10 15:15:03'
            },
            {
              content: "I've been sooo busy lately",
              me: false,
              timestamp: '2022-02-10 15:15:13'
            },
            {
              content: "I'm good, tired as per usual",
              me: true,
              timestamp: '2022-02-10 15:16:15'
            },
            {
              content: "What's kept you busy?",
              me: true,
              timestamp: '2022-02-10 15:16:40'
            },
            {
              content:
                  'This new project I took on, man is it time consuming. I thought it was going to be a lot easier...',
              me: false,
              timestamp: '2022-02-10 15:18:08'
            },
            {
              content: "Rip, I hope it's fun at least",
              me: true,
              timestamp: '2022-02-10 15:19:20'
            },
            {
              content: "Rip, I hope it's fun at least",
              me: true,
              timestamp: '2022-02-10 15:20:32'
            },
            {
              content: "Rip, I hope it's fun at least",
              me: true,
              timestamp: '2022-02-10 15:21:03'
            },
            {
              content: "Rip, I hope it's fun at least",
              me: true,
              timestamp: '2022-02-10 15:22:03'
            },
            {
              content: "Rip, I hope it's fun at least",
              me: true,
              timestamp: '2022-02-10 15:23:03'
            },
            {
              content: "Rip, I hope it's fun at least",
              me: true,
              timestamp: '2022-02-10 15:24:03'
            },
            {
              content: "Rip, I hope it's fun at least",
              me: true,
              timestamp: '2022-02-10 15:25:03'
            }
          ]
        },
        {
          id: 2,
          name: 'Jane Doe',
          username: '@janedoe',
          img: 'https://randomuser.me/api/portraits/women/45.jpg',
          lastMessage:
              "I couldn't believe it when I saw he had bought it. I really didn't expect that from him.",
          timeLastMessage: '2w',
          messages: [
            {
              content: 'Are you planning on going to the party on Friday?',
              me: true,
              timestamp: '2022-01-27 15:10:03'
            },
            {
              content: 'Not sure yet',
              me: false,
              timestamp: '2022-01-27 19:10:03'
            }
          ]
        },
        {
          id: 3,
          name: 'Scarlett Hienm',
          username: '@scarlettehienm',
          img: 'https://randomuser.me/api/portraits/women/17.jpg',
          lastMessage: 'Good idea',
          timeLastMessage: 'Oct 12, 2021',
          messages: [
            {
              content: 'Happy thanksgiving! How are you?',
              me: true,
              timestamp: '2021-10-12 10:10:03'
            },
            {
              content: "Thanks! I'm good you?",
              me: false,
              timestamp: '2021-10-12 11:10:03'
            },
            {
              content: 'Tired of work tbh',
              me: false,
              timestamp: '2021-11-12 14:10:03'
            },
            {
              content: "Oh yeah? Why's that?",
              me: true,
              timestamp: '2021-10-12 16:10:03'
            },
            {
              content: "What's kept you busy?",
              me: true,
              timestamp: '2021-10-12 16:11:03'
            },
            {
              content: "The project I'm working on is taking forever",
              me: false,
              timestamp: '2021-10-12 22:10:03'
            },
            {
              content: 'Sorry to hear that',
              me: true,
              timestamp: '2021-10-12 23:00:03'
            }
          ]
        }
      ]
    }
  },
  methods: {
    conversationSelected (name, username, img, messages) {
      this.$emit('clicked', name, username, img, messages)
    }
  }
}
</script>
