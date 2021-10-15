<template>
  <div>
    <v-app-bar
      color="primary"
      dark
      app
      clipped-left
    >
      <v-toolbar-title>Logo Here</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <v-text-field
        label="Search"
        append-icon="mdi-magnify"
        class="shrink"
        rounded
        solo
        light
      >
      </v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      
    </v-app-bar>
  </div>
</template>

<script>
export default {
    name: "NavBar",
    data: () => ({}),
};
</script>

<style>
  .v-text-field {
    align-items: center !important;
    padding-top: 25px !important;
  }
</style>