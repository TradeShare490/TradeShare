<template>
  <v-card style="height:100%">
    <MessagesComponent />
  </v-card>
</template>

<script>
import MessagesComponent from '../../components/Messages/MessagesComponent.vue'

export default {
  name: 'MessagesPage',
  components: {
    MessagesComponent
  }
}
</script>
