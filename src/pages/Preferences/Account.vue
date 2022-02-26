<template>
  <v-container fluid>
    <div class="mx-8">
      <span
        class="font-weight-bold d-flex justify-start mx-2 mt-3 mb-8"
        style="color: #66788A"
      >
        ACCOUNT
      </span>
      <v-divider class="mb-8" />
      <div class="d-flex align-center mx-16">
        <v-avatar size="18%">
          <v-img src="https://randomuser.me/api/portraits/men/1.jpg" />
        </v-avatar>
        <v-file-input
          class="ml-8"
          truncate-length="20"
          label="Change Profile Photo"
          accept="image/png, image/jpeg"
          append-icon="mdi-camera"
          prepend-icon=""
        />
        <div>
          <span
            class="font-weight-bold d-flex justify-start mx-2 mt-3 mb-8"
            style="color: #66788A"
          >
            Name
          </span>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'AccountPreferencesPage',
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  }
}
</script>
<style scoped>
.container {
  width: 65%;
  background-color: white;
  height: 100vh;
  flex-grow: 1;
}
@media only screen and (max-width: 768px) {
  .container {
  width: 100%;
  }
}
</style>
