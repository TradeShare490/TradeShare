<template>
  <v-container class="pt-16">
    <v-card class="mx-auto" max-width="250" elevation="0">
      <v-form ref="formSignUp" v-model="valid">
        <v-layout row wrap justify-center class="pb-3">
          <v-flex xs5>
            <v-text-field
              data-cy="first-name"
              v-model="firstName"
              label="First Name"
              color="primary"
              :rules="[rules.required]"
              @keyup.enter="submit"
            />
          </v-flex>
          <v-flex xs1 />
          <v-flex xs5>
            <v-text-field
              data-cy="last-name"
              v-model="lastName"
              label="Last Name"
              color="primary"
              :rules="[rules.required]"
              @keyup.enter="submit"
            />
          </v-flex>
        </v-layout>
        <v-text-field
          data-cy="user-name"
          v-model="username"
          label="Username"
          color="primary"
          :rules="[rules.required, rulesUsername.min, rulesUsername.format]"
          @keyup.enter="submit"
        />
        <v-text-field
          class="my-5"
          data-cy="email"
          v-model="email"
          label="Email"
          color="primary"
          :rules="[rules.required, rulesEmail.format]"
          @keyup.enter="submit"
        />
        <v-text-field
          class="my-5"
          data-cy="password"
          v-model="password"
          label="Password"
          color="primary"
          type="password"
          hint="At least 8 characters"
          :rules="[rules.required, rulesPassword.min]"
          @keyup.enter="submit"
          autocomplete="new-password"
        />
        <v-text-field
          class="my-5"
          data-cy="password-confirm"
          v-model="passwordConfirm"
          label="Confirm Password"
          color="primary"
          type="password"
          :rules="[rules.required, rulesPassword.min, passwordConfirmation]"
          @keyup.enter="submit"
        />

        <v-btn
          data-cy="signup-button"
          width="250"
          height="45"
          color="primary"
          class="my-3 text-button"
          @click="submit"
          >Sign Up</v-btn
        >
      </v-form>
      <v-alert data-cy="error" dense text v-if="error" type="error">
        {{ error }}
      </v-alert>
      <p class="text-body-2 pt-4">
        Already have an account?
        <router-link data-cy="login-link" to="./login">Log In</router-link>
      </p>
    </v-card>
  </v-container>
</template>

<script>
import { signUp } from "../../hooks/useCredential.js";

export default {
  name: "SignUp",
  data: () => ({
    valid: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    value: String,
    password: "",
    passwordConfirm: "",
    rules: {
      required: v => !!v || "Required"
    },
    rulesEmail: {
      format: v =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid"
    },
    rulesUsername: {
      min: v => v.length >= 4 || "Min 4 characters",
      format: v =>
        /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(v) ||
        "No special characters"
    },
    rulesPassword: {
      min: v => v.length >= 8 || "Min 8 characters"
    },
    error: false
  }),
  methods: {
    async submit() {
      if (this.$refs.formSignUp.validate()) {
        let credentials = {
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirm,
          firstname: this.firstName,
          lastname: this.lastName,
          username: this.username
        };
        try {
          await signUp(credentials, this.$store, this.$router);
        } catch (e) {
          this.error = e;
        }
      }
    }
  },
  computed: {
    passwordConfirmation() {
      return () =>
        this.password === this.passwordConfirm || "Password must match";
    }
  }
};
</script>
