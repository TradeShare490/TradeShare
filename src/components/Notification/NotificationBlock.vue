/* eslint-disable vue/no-v-html */
<template>
  <div
    class="NotificationBlock"
    :class="[readedData ? '' : NotificationBlockUnreadStyle]"
    @mouseover="hover"
  >
    <v-list-item
      :key="message"
      class="pr-0"
    >
      <v-list-item-avatar class="mt-6">
        <v-img :src="avatar" />
      </v-list-item-avatar>
      <v-list-item-content class="mx-0 pr-0">
        <v-list-item-subtitle
          class="message font-weight-medium mr-0 black--text"
        >
          {{ message }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="pr-1">
        <v-list-item-action-text> {{ getDate() }}</v-list-item-action-text>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'NotificationBlock',
  props: {
    avatar: {
      type: String,
      default: require('../../assets/default_user.png')
    },
    message: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    destination: {
      type: String,
      default: ''
    },
    readed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      readedData: this.readed,
      router: '/dashboard/' + this.id,
      unReadBackgroundColor: '#ff0000',
      NotificationBlockUnreadStyle: 'NotificationBlockUnread'
    }
  },
  methods: {
    getDate () {
      return '3d'
    },
    hover () {
      this.readedData = true
    }
  }
}
</script>
<style scoped>
.NotificationBlock {
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
}
.NotificationBlockUnread {
  background-color: #D6D9EC;
  border-radius: 0px;
}
.NotificationBlock:hover {
  background-color: #acb0d1;
  -webkit-transition: background-color 100ms linear;
  -ms-transition: background-color 100ms linear;
  transition: background-color 100ms linear;
}
.message {
  text-align: left;
  font-size: 0.9em;
  max-width: 40ch;
  font-weight: 600;
}
</style>
