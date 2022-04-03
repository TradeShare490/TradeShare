<template>
  <v-container
    fluid
    data-cy="support-page"
  >
    <div :class="$vuetify.breakpoint.lgAndDown ? 'mx-3' : 'mx-8'">
      <span class="font-weight-bold d-flex justify-start mx-1 mt-3 mb-8">
        SUPPORT
      </span>
      <v-divider class="mb-8" />
      <div class="d-flex flex-column mx-12 mt-5 mb-10">
        <span class="text-left mb-5">
          FAQ
        </span>
        <v-expansion-panels focusable>
          <v-expansion-panel
            v-for="(item, i) in faq"
            :key="i"
            data-cy="expansion-panel"
          >
            <v-expansion-panel-header> {{ item.title }} </v-expansion-panel-header>
            <v-expansion-panel-content
              class="text-left mt-5"
              data-cy="expansion panel content"
            >
              {{ item.content }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <v-divider class="mb-8" />
      <div class="d-flex flex-column mx-12 my-5">
        <span class="text-left">
          Contact Us / Send Feedback
        </span>
        <v-form
          class="mt-5"
          :class="$vuetify.breakpoint.xsOnly ? 'mx-0' : 'mx-8'"
        >
          <v-row
            no-gutters
            class="mb-5"
          >
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class="mt-2 d-flex justify-start"
            >
              <span class="mr-2">
                Name
              </span>
            </v-col>
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '8'"
              class="text-left"
            >
              <v-text-field
                :label="$t('fullname')"
                outlined
                dense
                solo
                flat
                hide-details
                disabled
                data-cy="name-text"
              />
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="mb-5"
          >
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class="mt-2 d-flex justify-start"
            >
              <span class="mr-2">
                Email
              </span>
            </v-col>
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '8'"
              class="text-left"
            >
              <v-text-field
                :label="$t('email')"
                outlined
                dense
                solo
                flat
                hide-details
                disabled
                data-cy="email-text"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class="mt-2 d-flex justify-start"
            >
              <span class="text-left mr-2">
                How Can We Help?
              </span>
            </v-col>
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '8'"
              class="text-left"
            >
              <div>
                <v-autocomplete
                  v-model="type"
                  :items="categories"
                  item-text="type"
                  dense
                  outlined
                  solo
                  flat
                  return-object
                  label="Select a Category"
                  data-cy="help-select"
                />
              </div>
            </v-col>
          </v-row>
          <v-row
            no-gutters
          >
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class="mt-2 d-flex justify-start"
            >
              <span class="mr-2">
                Message
              </span>
            </v-col>
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '8'"
              class="text-left"
            >
              <v-textarea
                v-model="message"
                label="Type your message here"
                outlined
                solo
                flat
                hide-details
                auto-grow
                rows="5"
                data-cy="message-text"
              />
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="d-flex justify-start mt-5"
          >
            <v-btn
              filled
              color="primary"
              :ripple="false"
              data-cy="send-btn"
              @click="send"
            >
              Send
            </v-btn>
            <v-snackbar
              v-model="snackbar"
              :timeout="timeout"
              color="primary"
              right
              data-cy="snackbar"
            >
              {{ snackbarText }}
            </v-snackbar>
          </v-row>
        </v-form>
      </div>
    </div>
  </v-container>
</template>

<script>
import axiosInstance from '../../axios/axios.v1'

export default {
  name: 'SupportPage',
  data: () => ({
    faq: [
      { title: 'FAQ1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
      { title: 'FAQ2', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
      { title: 'FAQ3', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
      { title: 'FAQ4', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
    ],
    categories: [
      { value: '0', type: 'General Inquiries' },
      { value: '1', type: 'Account Issues' },
      { value: '2', type: 'Technical Issues' },
      { value: '3', type: 'Security Issues' },
      { value: '4', type: 'Payment Issues' }
    ],
    selectLanguage: null,
    timeout: 1500,
    snackbar: false,
    snackbarText: 'Your message has been sent to us, and we will get back to you shortly.',
    fullname: '',
    email: '',
    type: '',
    message: ''
  }),
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    async send () {
      this.snackbar = true
      const sendEmail = {
        to: 'tradeshare.ca@gmail.com',
        subject: `TradeShare: ${this.type.type} - ${this.fullname}`,
        text: `${this.message} - ${this.email}`
      }
      try {
        return axiosInstance.post('/mailer', sendEmail)
      } catch (e) {
        this.error = e
      }
    },
    $t (label) {
      if (label === 'fullname') {
        this.fullname = this.user.firstname + ' ' + this.user.lastname
        return this.fullname
      }
      /* istanbul ignore next */
      if (label === 'username') {
        return this.user.username
      }
      /* istanbul ignore else */
      if (label === 'email') {
        this.email = this.user.email
        return this.email
      } else {
        return 'invalid label'
      }
    }
  }
}
</script>
<style scoped>
.v-text-field--outlined:hover >>> fieldset {
  border: 1px solid #3F51B5;
}
.container {
  width: 65%;
  background-color: white;
  min-height: 100vh;
  flex-grow: 1;
}
span {
  color: #66788A;
}
@media only screen and (max-width: 768px) {
  .container {
  width: 100%;
  }
}
</style>
