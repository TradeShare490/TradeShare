/* eslint-disable vue/no-v-html */
<template>
  <div class="NotificationBlock">
    <v-list-item
      :key="message"
      class="pr-0"
    >
      <v-list-item-avatar class="mt-6">
        <v-img :src="avatar" />
      </v-list-item-avatar>
      <v-list-item-content class="mx-0 pr-0">
        <v-list-item-subtitle
          class="message font-weight-medium mr-0"
          v-html="message"
        /> <!-- Noncompliant -->
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
    }
  },
  data () {
    return {
      router: '/dashboard/' + this.id
    }
  },
  methods: {
    getDate () {
      return '3d'
    }
  }
}
</script>
<style scoped>
.NotificationBlock {
  background-color: rgb(255, 255, 255);
}
.NotificationBlock:hover {
  background-color: #aab2ec;
  -webkit-transition: background-color 100ms linear;
  -ms-transition: background-color 100ms linear;
  transition: background-color 100ms linear;
}
.message {
  text-align: left;
  font-size: 0.9em;
  max-width: 40ch;
  /* font-weight: 600; */
}
</style>
