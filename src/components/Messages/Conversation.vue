<template>
  <v-list-item
    :value="chat.id"
  >
    <v-avatar
      class="profile"
      size="40"
    >
      <v-img :src="chat.img" />
    </v-avatar>
    <v-list-item-content class="text-left pl-5">
      <v-col
        class="px-0 py-0"
        cols="7"
      >
        <v-list-item-title
          class="text-wrap text-body-2"
          v-text="chat.name"
        />
      </v-col>
      <v-col
        class="px-0 py-0"
        cols="5"
      />
      <v-col class="px-0 py-0">
        <v-list-item-subtitle
          class="pt-2 text-caption text-truncate"
          style="max-width: 19vw;"
          v-text="latestMessage"
        />
      </v-col>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'ConversationBlock',
  props: {
    chat: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      latestMessage: this.chat.latestMessage
    }
  },
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    setLatestMessage (msg) {
      this.latestMessage = msg
    }
  }
}
</script>
