<template>
  <v-container
    fluid
    fill-height
    class="pa-0 d-flex justify-center align-center"
  >
    <v-row
      class="no-gutters"
      style="overflow: hidden; height:100%"
    >
      <v-col
        cols="12"
        sm="5"
        md="4"
        lg="4"
        xl="4"
        class="flex-grow-1 flex-shrink-0"
        style="border-right: 1px solid #0000001f"
      >
        <ChatMenu @clicked="conversationSelected" />
      </v-col>
      <v-col
        cols="auto"
        class="flex-grow-1 flex-shrink-0"
      >
        <v-row
          class="pl-3"
          @change="$vuetify.goTo(9999)"
        >
          <v-col
            cols="1"
            class="pt-8"
          >
            <v-avatar
              class="profile"
              size="40"
            >
              <v-img :src="avatar" />
            </v-avatar>
          </v-col>
          <v-col cols="6">
            <v-card-title
              class="text-body-1"
              data-cy="name"
            >
              {{ name }}
            </v-card-title>
            <v-card-subtitle
              class="text-left text--lighten-2"
              data-cy="username"
            >
              {{ activeChat ? '@' : '' }}{{ username }}
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-divider v-if="activeChat" />
        <v-responsive
          class="overflow-y-hidden fill-height"
          height="80vh"
        >
          <v-card
            v-if="!activeChat"
            flat
            class="fill-height d-flex align-center justify-center"
            data-cy="no-messages-window"
          >
            <v-list>
              <h2 class="primary--text font-weight-light">
                Your messages
              </h2>
              <v-list-item-subtitle>
                Send private messages and attachments to a friend or
                group
              </v-list-item-subtitle>
            </v-list>
          </v-card>
          <v-card
            v-if="activeChat"
            flat
            class="d-flex flex-column fill-height"
            data-cy="messages-window"
          >
            <v-card-text
              ref="messages"
              class="flex-grow-1 overflow-y-auto"
              data-cy="messages"
            >
              <div
                v-for="(msg, i) in messages"
                :key="i"
                :class="{ 'd-flex justify-start': !msg.me }"
              >
                <div :class="{ 'd-flex flex-row-reverse': msg.me }">
                  <v-menu offset-y>
                    <template #activator="{}">
                      <v-chip
                        style="
                          height: auto;
                          white-space: normal;
                          max-width: 360px;"
                        class="px-4 py-2 mb-2 black--text text-left"
                        :outlined="!msg.me"
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
                hide-details
                single-line
                data-cy="send-message"
                @keyup.enter="onSubmit(messageForm)"
              >
                <template #prepend-inner>
                  <v-icon
                    class="mr-2"
                    color="primary"
                    data-cy="emoji-button"
                    @click="click"
                  >
                    insert_emoticon
                  </v-icon>
                </template>
                <template #append>
                  <v-icon
                    class="px-2"
                    color="primary"
                    data-cy="image-button"
                    @click="click"
                  >
                    image
                  </v-icon>
                  <v-icon
                    color="primary"
                    data-cy="send-button"
                    @click="onSubmit(messageForm)"
                  >
                    send
                  </v-icon>
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
import ChatMenu from '../Messages/ChatMenu.vue'
import axios from '../../axios/axios.v1'
import socket from '../../socket'
export default {
  name: 'MessagesComponent',
  components: {
    ChatMenu
  },
  props: {
    image: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    conversationId: '',
    activeChat: false,
    name: '',
    username: '',
    avatar: '',
    messages: [],
    messageForm: {
      content: '',
      me: true
    },
    users: []
  }),
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  updated () {
    this.$nextTick(() => this.scrollToBottom())
  },
  created () {
    console.log(JSON.parse(localStorage.getItem('user')).username)
    const username = JSON.parse(localStorage.getItem('user')).username
    socket.auth = { username }
    socket.connect()
    console.log('check 1', socket.connected)
    socket.on('connect', () => {
      console.log('check 2', socket.connected)
    })
    socket.emit('addUser', username)
    socket.on('getMessage', (data) => {
      this.messages.push({
        content: data.content,
        me: false
      })
      this.$root.$refs.ChatMenu.updateChat(this.conversationId, data.content)
    })
  },
  methods: {
    async setMessages (conversationId) {
      const response = await axios.get(`message/${conversationId}`)
      const messages = response.data.messages
      messages.map((msg) => {
        return this.messages.push({
          content: msg.message,
          me: this.user.username === msg.sender
        })
      })
    },
    onSubmit (messageForm) {
      const content = messageForm.content
      if (content.length > 0) {
        socket.emit('sendMessage', {
          sender: JSON.parse(localStorage.getItem('user')).username,
          receiver: this.username,
          content: content
        })
        this.messages.push({ content: content, me: messageForm.me })
        this.messageForm.content = ''
        axios.post('/message', {
          sender: this.user.username,
          message: content,
          conversationId: this.conversationId
        })
        this.$root.$refs.ChatMenu.updateChat(this.conversationId, content)
      }
    },
    click () {
      alert('You clicked the icon!')
    },
    conversationSelected (name, username, avatar, conversationId) {
      this.name = name
      this.username = username
      this.avatar = avatar
      this.activeChat = true
      this.conversationId = conversationId
      this.messages = []
      this.setMessages(conversationId)
    },
    scrollToBottom () {
      const container = this.$refs.messages
      container.scrollTop = container.scrollHeight
    },
    destroyed () {
      socket.off('connect')
      socket.off('addUser')
      socket.off('sendMessage')
      socket.off('getMessage')
    }
  }
}
</script>
