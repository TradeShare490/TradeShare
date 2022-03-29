<template>
  <div class="container mt-0 mx-auto">
    <div class="title mt-6 mb-11 px-7">
      Forgot Password (Enter Email)
    </div>
    <div>
      <v-form
        ref="emailForm"
        v-model="valid"
      >
        <p>
          Enter your email and if your email exists then we will send you a password replacement form.
        </p>
        <br>
        <v-label for="enter-email">
          Enter Email:
        </v-label>
        <v-text-field
          v-model="email"
          class="my-5"
          data-cy="email"
          label="Email"
          color="primary"
          :rules="[rules.required, rulesEmail.format]"
          @keyup.enter="submit"
        />
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
      </v-form>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../../axios/axios.v1'
export default {
  name: 'EmailSender',
  data: () => ({
    valid: '',
    email: '',
    rules: {
      required: v => !!v || 'Required'
    },
    rulesEmail: {
      format: v =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'E-mail must be valid'
    }
  }),
  methods: {
    async submit () {
      if (this.$refs.emailForm.validate()) {
        try {
          const UserInfo = await axiosInstance.get(`/userInfo?searchQuery=${this.email}&limit=1`)
          const MailOption = {
            to: this.email,
            subject: 'TradeShare: Forgot Password',
            text: `Change your password in the following link http://localhost:8081/forgotpassword/userId=${UserInfo.data.data[0].userId}`
          }
          print('sending MailOption to mailer')
          console.log(MailOption.text)
          return await axiosInstance.post('/mailer', MailOption)
        } catch (e) {
          this.error = e
        }
      }
    }
  }
}
</script>
