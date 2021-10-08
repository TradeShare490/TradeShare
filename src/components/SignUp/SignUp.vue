<template>
  <v-container class="pt-16">
    <v-card class="mx-auto" max-width="250" elevation="0">
    <v-form
      ref="formSignUp"
      v-model="valid"
    >
    <v-layout row wrap justify-center class="pb-3">
      <v-flex xs5>
        <v-text-field
          v-model="firstName"
          label="First Name"
          color="primary"
          :rules="[rules.required]"
          @keyup.enter="submit"
        ></v-text-field>
      </v-flex>

      <v-flex xs1></v-flex>

      <v-flex xs5>
        <v-text-field
          v-model="lastName"
          label="Last Name"
          color="primary"
          :rules="[rules.required]"
          @keyup.enter="submit"
        ></v-text-field>
      </v-flex>
    </v-layout>

      <v-text-field
        v-model="username"
        label="Username"
        color="primary"
        :rules="[rules.required, rulesUsername.min]"
        @keyup.enter="submit"
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="Email"
        color="primary"
        :rules="[rules.required, rulesEmail.format]"
        @keyup.enter="submit"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        color="primary"
        type="password"
        hint="At least 8 characters"
        :rules="[rules.required, rulesPassword.min]"
        @keyup.enter="submit"
      ></v-text-field>

      <v-text-field
        v-model="passwordConfirm"
        label="Confirm Password"
        color="primary"
        type="password"
        :rules="[rules.required, rulesPassword.min, passwordConfirmation]"
        @keyup.enter="submit"
      ></v-text-field>

      <v-btn width="250" height="45" color="primary" class="my-3 text-button" @click="submit">Sign Up</v-btn>
    </v-form>

    <p class="text-body-2 pt-4">Already have an account? <router-link to="./login">Log In</router-link></p>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "SignUp",
  data: () => ({
    valid: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    value: String,
    password: '',
    passwordConfirm: '',
    rules: {
      required: v => !!v || 'Required',
    },
    rulesUsername: {
      min: v => v.length >= 4 || 'Min 4 characters'
    },
    rulesEmail: {
      format: v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
    },
    rulesPassword: {
      min: v => v.length >= 8 || 'Min 8 characters',
    },
  }),
  methods: {
    submit () {
      // add check to see if contents are undefined 
      if(this.$refs.formSignUp.validate()) {
      console.log(
        "First Name: " , this.firstName , "\n", 
        "Last Name: " , this.lastName, "\n",
        "Username: " , this.username, "\n",
        "Email: " , this.email, "\n",
        "Password: " , this.password, "\n",
        "Confirm Password: " , this.passwordConfirm)
      }
    }
  },
  computed: {
    passwordConfirmation() {
      return () => (this.password === this.passwordConfirm) || 'Password must match'
    }
}
};
</script>