<template>
  <v-container class="pt-16">
    <v-card class="mx-auto" max-width="250" elevation="0">
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="user_id"
        label="Email or Username"
        color="primary"
        :rules="rules_id"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :value="password"
        label="Password"
        color="primary"
        :append-icon="value ? 'visibility_off' : 'visibility'" 
        @click:append="() => (value = !value)"
        :type="value ? 'password' : 'text'"
        :rules="rules_pass"
      ></v-text-field>

      <p left class="text-body-2 text-right"><router-link to="">Forgot Password</router-link></p>
      <v-btn width="250" height="45" color="primary" class="my-3 text-button" @click="submit">Log In</v-btn>
    </v-form>

    <p class="text-body-2 pt-4">Don't have an account? <router-link to="./signup">Sign up</router-link></p>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    valid: '',
    user_id: '',
    value: String,
    password: '',
    rules_id: [
      v => !!v || 'Email or username is required',
    ],
    rules_pass: [
      v => !!v || 'Password is required',
    ],
  }),
  methods: {
    submit () {
      console.log(this.user_id, this.password)
    }
  }
};
</script>