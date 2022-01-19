<template>
  <v-container class="pt-16">
    <v-card class="mx-auto" max-width="250" elevation="0">
      <v-form ref="formLogin" v-model="valid" data-cy="login-form">
        <v-text-field
          v-model="email"
          label="Email"
          color="primary"
          :rules="[rules.required]"
          @keyup.enter="submit"
          data-cy="email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :value="password"
          label="Password"
          color="primary"
          :append-icon="value ? 'visibility_off' : 'visibility'"
          @click:append="() => (value = !value)"
          :type="value ? 'password' : 'text'"
          :rules="[rules.required]"
          @keyup.enter="submit"
          data-cy="password"
        ></v-text-field>

        <p left class="text-body-2 text-right">
          <router-link to="">Forgot Password</router-link>
        </p>
        <v-btn
          width="250"
          height="45"
          color="primary"
          class="my-3 text-button"
          @click="submit"
          data-cy="login-button"
          >Log In</v-btn
        >
      </v-form>
      <v-alert dense text v-if="error" type="error">
        {{ error }}
      </v-alert>
      <p class="text-body-2 pt-4">
        Don't have an account? <router-link to="./signup">Sign up</router-link>
      </p>
    </v-card>
  </v-container>
</template>

<script>
import { login } from "../../hooks/useCredential.js";
export default {
  name: "Login",
  data: () => ({
    valid: "",
    email: "",
    value: String,
    password: "",
    rules: {
      required: (v) => !!v || "Required",
    },
    error: false,
  }),
  methods: {
    submit() {
      if (this.$refs.formLogin.validate()) {
        login(
          { email: this.email, password: this.password },
          this.$store,
          this.$router
        );
      }
    },
  },
};
</script>
