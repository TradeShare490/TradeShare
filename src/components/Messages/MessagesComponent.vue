<template>
  <v-container
    fluid
    fill-height
    class="pa-0 d-flex justify-center align-center"
  >
    <v-row
      class="no-gutters"
      style="overflow: hidden"
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
              {{ username }}
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
                      <!-- needed for messages to be displayed -->
                      <v-chip
                        style="
                          height: auto;
                          white-space: normal;
                          max-width: 360px;"
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
                hide-details
                single-line
                data-cy="send-message"
                @keyup.enter="messages.push(messageForm)"
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
                    @click="messages.push(messageForm)"
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
    activeChat: false,
    name: '',
    username: '',
    avatar: '',
    messages: [],
    messageForm: {
      content: '',
      me: true
    }
  }),
  updated () {
    this.$nextTick(() => this.scrollToBottom())
  },
  created () {
    if (performance.getEntriesByType('navigation')[0].type === 'reload') {
      this.$router.push({ path: '/messages/0' })
    }
  },
  methods: {
    click () {
      alert('You clicked the icon!')
    },
    conversationSelected (name, username, avatar, message) {
      this.name = name
      this.username = username
      this.avatar = avatar
      this.messages = message
      this.activeChat = true
    },
    scrollToBottom () {
      const container = this.$refs.messages
      container.scrollTop = container.scrollHeight
    }
  }
}
</script>
