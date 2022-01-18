<template>
  <v-card>
    <MessagesComponent/>
  </v-card>
</template>

<script>
  import MessagesComponent from "../../components/Messages/MessagesComponent.vue"
  export default {
    name: "Messages",
    components: {
      MessagesComponent,
    }
  };
</script>
