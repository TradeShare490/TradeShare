<template>
  <v-container class="pt-16">
    <v-card
      class="mx-auto"
      max-width="250"
      elevation="0"
    >
      <v-form
        ref="formLogin"
        v-model="valid"
        data-cy="login-form"
      >
        <v-text-field
          v-model="field"
          label="Email or Username"
          color="primary"
          :rules="[rules.required]"
          data-cy="email"
          @keyup.enter="submit"
        />
        <v-text-field
          v-model="password"
          :value="password"
          label="Password"
          color="primary"
          :append-icon="value ? 'visibility_off' : 'visibility'"
          :type="value ? 'password' : 'text'"
          :rules="[rules.required]"
          data-cy="password"
          @click:append="() => (value = !value)"
          @keyup.enter="submit"
        />
        <p class="text-body-2 text-right">
          <router-link to="forgotpasswordemail">
            Forgot Password
          </router-link>
        </p>
        <v-btn
          width="250"
          height="45"
          color="primary"
          class="my-3 text-button"
          data-cy="login-button"
          @click="submit"
        >
          Log In
        </v-btn>
      </v-form>
      <v-alert
        v-if="error"
        dense
        text
        type="error"
      >
        {{ error }}
      </v-alert>
      <p class="text-body-2 pt-4">
        Don't have an account?
        <router-link
          to="./signup"
          exact
        >
          Sign up
        </router-link>
      </p>
    </v-card>
  </v-container>
</template>

<script>
import { login } from '../../hooks/useCredential.js'
export default {
  name: 'LoginComponent',
  data: () => ({
    valid: '',
    field: '',
    value: String,
    password: '',
    rules: {
      required: v => !!v || 'Required'
    },
    error: false
  }),
  methods: {
    async submit () {
      let payload = {}
      if (this.$refs.formLogin.validate()) {
        if (this.field.includes('@')) {
          payload = {
            email: this.field,
            password: this.password
          }
        } else {
          payload = {
            username: this.field,
            password: this.password
          }
        }
        try {
          await login(payload, this.$store, this.$router)
        } catch (e) {
          this.error = e
        }
      }
    }
  }
}
</script>
