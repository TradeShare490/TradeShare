<template>
  <div class="container mt-0 mx-auto">
    <div class="title mt-6 mb-11 px-7">
      Forgot Password
    </div>
    <div>
      <div>
        <p>
          Enter and confirm your new password in the text fields below. Make sure to have at least 8 characters.
        </p>
        <br>
        <v-label for="pwd">
          New Password:
        </v-label>
        <v-input
          id="pwd"
          type="password"
          name="pwd"
        >
          <br>
          <br>
          <v-label for="pwd-conf">
            Confirm New Password:
          </v-label>
          <input
            id="pwd-conf"
            type="password"
            name="pwd-conf"
          >
          <br>
          <v-btn
            width="250"
            height="45"
            color="primary"
            class="my-3 text-button"
            data-cy="login-button"
            @click="submit"
          >
            Submit New Password
          </v-btn>
        </v-input>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    async submit () {
      // here we should call the method that patches the password in the mongodb
      return 0
    }
  }
}
</script>
