<template>
  <v-container>
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

          <v-text-field
            v-model="password"
            class="my-5"
            data-cy="password"
            label="Password"
            color="primary"
            type="password"
            hint="At least 8 characters"
            :rules="[rules.required, rulesPassword.min]"
            autocomplete="new-password"
            @keyup.enter="submit"
          />
          <v-text-field
            v-model="passwordConfirm"
            class="my-5"
            data-cy="password-confirm"
            label="Confirm Password"
            color="primary"
            type="password"
            :rules="[rules.required, rulesPassword.min, passwordConfirmation]"
            @keyup.enter="submit"
          />
          <br>
          <v-btn
            data-cy="signup-button"
            width="250"
            height="45"
            color="primary"
            class="my-3 text-button"
            @click="submit"
          >
            submit
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import axiosInstance from '../../axios/axios.v1'
export default {
  name: 'ChangePassword',
  data: () => ({
    uid: this.$route.params.uid,
    value: String,
    password: '',
    passwordConfirm: '',
    rules: {
      required: v => !!v || 'Required'
    },
    rulesPassword: {
      min: v => v.length >= 8 || 'Min 8 characters'
    },
    error: false
  }),
  computed: {
    passwordConfirmation () {
      return () =>
        this.password === this.passwordConfirm || 'Password must match'
    }
  },
  methods: {
    async submit () {
      // here we will patch the request!
      if (this.passwordConfirmation()) {
        try {
          console.log(this.uid)
          return axiosInstance.patch(`/userInfo/${this.uid}`, { password: this.password })
        } catch (e) {
          console.log(e)
        }
      }
      return 0
    }
  }
}
</script>
