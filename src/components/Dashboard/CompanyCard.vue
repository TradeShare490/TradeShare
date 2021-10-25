<template>
  <v-list-item>
    <v-list-item-avatar class="avatar" tile>
      <v-img src="../../assets/TradeShare.png"></v-img>
    </v-list-item-avatar>

    <v-list-item-content class="text-left ml-3">
      <v-list-item-title>{{ title }}</v-list-item-title>
      <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  props: ["title", "subtitle", "imgsrc"],
};
</script>

<style>
</style>