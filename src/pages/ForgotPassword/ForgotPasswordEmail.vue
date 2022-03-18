<template>
  <div class="container mt-0 mx-auto">
    <div class="title mt-6 mb-11 px-7">
      Forgot Password (Enter Email)
    </div>
    <div>
      <v-form>
        <p>
          Enter your email and if your email exists then we will send you a password replacement form.
        </p>
        <br>
        <v-label for="enter-email">
          Enter Email:
        </v-label>
        <v-input
          id="enter-email"
          name="enter-email"
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
            Submit
          </v-btn>
        </v-input>
      </v-form>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    submit() {
      
    }
  }
}
</script>
