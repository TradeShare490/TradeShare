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
          v-for="(chat, i) in chats"
          :key="i"
          :to="/messages/ + chat.id"
          data-cy="chat"
          class="px-0"
          @click="
            conversationSelected(
              chat.name,
              chat.username,
              chat.img,
              chat.id
            )"
        >
          <ConversationBlock :chat="chat" />
        </v-list-item>
      </v-list>
    </v-responsive>
  </v-container>
</template>

<script>
import NewMessage from '../Messages/NewMessage.vue'
import UserService from '../../services/User.service'
import ConversationBlock from './Conversation'
export default {
  name: 'ChatMenu',
  components: {
    ConversationBlock,
    NewMessage
  },
  data: function () {
    return {
      conversations: [],
      chats: []
    }
  },
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  created () {
    this.initialize()
    this.$root.$refs.ChatMenu = this
  },
  methods: {
    conversationSelected (name, username, img, conversationId) {
      this.$emit('clicked', name, username, img, conversationId)
    },
    async initialize () {
      try {
        this.conversations = await UserService.getConversations(JSON.parse(localStorage.getItem('user')).username)
      } catch (err) {
        console.log(err)
      } finally {
        this.chats = []
        this.conversations.forEach((conversation) => {
          this.chats.push({
            id: conversation._id,
            username: conversation.members.filter(member => member !== this.user.username)[0],
            name: conversation.membersNames.filter(member => member !== this.user.firstname + ' ' + this.user.lastname)[0],
            latestMessage: conversation.latestMessage.length > 0 ? conversation.latestMessage[0].message : ' ',
            img: 'https://randomuser.me/api/portraits/women/17.jpg'
          })
        })
      }
    },
    updateChat (conversationId, content) {
      this.chats = this.chats.map((chat) => {
        if (chat.id === conversationId) {
          return { ...chat, latestMessage: content }
        } else {
          return chat
        }
      })
    }
  }
}
</script>
