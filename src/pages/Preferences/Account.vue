<template>
  <v-container fluid>
    <div :class="$vuetify.breakpoint.lgAndDown ? 'mx-3' : 'mx-8'">
      <span class="font-weight-bold d-flex justify-start mx-2 mt-3 mb-8">
        ACCOUNT
      </span>
      <v-divider class="mb-8" />
      <div :class="$vuetify.breakpoint.lgAndDown ? 'mx-5' : 'mx-16'">
        <v-row no-gutters>
          <v-col :cols="$vuetify.breakpoint.xsOnly ? '10' : '4'">
            <v-avatar size="100px">
              <v-img src="https://randomuser.me/api/portraits/men/1.jpg" />
            </v-avatar>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.xsOnly ? '2' : '8'"
            align-self="center"
          >
            <v-file-input
              truncate-length="20"
              label="Change Profile Photo"
              accept="image/png, image/jpeg"
              :append-icon="$vuetify.breakpoint.xsOnly ? '' : 'mdi-camera'"
              :prepend-icon="$vuetify.breakpoint.xsOnly ? 'mdi-camera' : ''"
              :hide-input="$vuetify.breakpoint.xsOnly ? true : false"
            />
          </v-col>
        </v-row>
        <v-form :class="$vuetify.breakpoint.xsOnly ? 'mt-8' : 'mt-12'">
          <v-row
            no-gutters
            :class="$vuetify.breakpoint.xsOnly ? 'mb-5' : 'mb-10'"
          >
            <v-spacer />
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class="mt-2 d-flex justify-start"
            >
              <span>
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
              />
              <span class="caption">
                Name can be changed once within 30 days
              </span>
            </v-col>
          </v-row>
          <v-row
            no-gutters
            :class="$vuetify.breakpoint.xsOnly ? 'mb-5' : 'mb-10'"
          >
            <v-spacer />
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class="mt-2 d-flex justify-start"
            >
              <span>
                Username
              </span>
            </v-col>
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '8'"
              class="text-left"
            >
              <v-text-field
                :label="$t('username')"
                outlined
                dense
                solo
                flat
                hide-details
              />
              <span class="caption">
                Username can be changed once within 30 days
              </span>
            </v-col>
          </v-row>
          <v-row
            no-gutters
            :class="$vuetify.breakpoint.xsOnly ? 'mb-10' : 'mb-16'"
          >
            <v-spacer />
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class="mt-2 d-flex justify-start"
            >
              <span>
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
              />
            </v-col>
          </v-row>
        </v-form>
        <v-row
          no-gutters
          :class="$vuetify.breakpoint.xsOnly ? 'mb-5' : 'mb-15'"
        >
          <v-spacer />
          <v-col
            :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
            class="mt-1 d-flex justify-start"
            :class="{'mt-2': $vuetify.breakpoint.lgAndDown}"
          >
            <span>
              {{ verified ? "Verified" : "Not Verified" }}
            </span>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.xsOnly ? '12' : '8'"
            class="text-left d-flex align-center"
          >
            <v-btn
              text
              color="primary"
              :ripple="false"
              class="text pa-0"
              :disabled="verified"
              @click="verify()"
            >
              Request Verification
            </v-btn>
            <v-snackbar
              v-model="snackbar"
              :timeout="timeout"
              color="primary"
              right
            >
              {{ snackbarText }}
            </v-snackbar>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          :class="$vuetify.breakpoint.xsOnly ? 'mx-0 mb-0' : 'mx-12 mb-3'"
          class="text-left d-flex align-center"
        >
          <v-btn
            text
            color="primary"
            :ripple="false"
            class="text pa-0"
            @click="warning(true)"
          >
            Temporarily Disable Account
          </v-btn>
        </v-row>
        <v-row
          no-gutters
          :class="$vuetify.breakpoint.xsOnly ? 'mx-0' : 'mx-12'"
          class="mb-3 text-left d-flex align-center"
        >
          <v-btn
            text
            color="primary"
            :ripple="false"
            class="text pa-0"
            @click="warning(false)"
          >
            Delete Account
          </v-btn>
        </v-row>
        <v-row
          no-gutters
          class="mx-12 pb-3"
        >
          <v-btn
            color="primary"
            :ripple="false"
            type="submit"
          >
            Submit
          </v-btn>
        </v-row>
      </div>
      <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <v-card>
          <div>
            <v-card-text
              v-if="disable"
              class="text-h6"
            >
              Are you sure you want to <span class="blue--text">&nbsp;disable&nbsp;</span> your account?
            </v-card-text>
            <v-card-text
              v-else
              class="text-h6"
            >
              Are you sure you want to <span class="red--text lighten-1--text">&nbsp;delete&nbsp;</span> your account?
            </v-card-text>
          </div>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              depressed
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              class="ml-3"
              depressed
              color="primary"
              @click="handleAction()"
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="snackbar2"
        color="primary"
        :timeout="timeout"
        right
      >
        {{ snackbar2Text }}
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'AccountPreferencesPage',
  data () {
    return {
      verified: false,
      disable: false,
      dialog: false,
      timeout: 1500,
      snackbar: false,
      snackbar2: false,
      snackbarText: 'Request Sent',
      snackbar2Text: 'Account Disabled'
    }
  },
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    $t (label) {
      if (label === 'fullname') {
        return this.user.firstname + ' ' + this.user.lastname
      }
      if (label === 'username') {
        return this.user.username
      }
      if (label === 'email') {
        return this.user.email
      } else {
        return 'invalid label'
      }
    },
    verify () {
      this.snackbar = true
    },
    warning (disable) {
      this.disable = disable
      this.dialog = true
    },
    handleAction () {
      const err = false

      if (this.disable === true) {
        console.log('Disable account function')
      } else {
        console.log('Delete account function')
      }

      if (err) {
        this.snackbar2Text = 'Error occured'
        this.snackbar2 = true
        return
      } else if (this.disable === true) {
        this.snackbar2Text = 'Account disabled'
        this.snackbar2 = true
      } else {
        this.snackbar2 = true
        this.snackbar2Text = 'Account deleted'
      }
      this.dialog = false
    }
  }
}
</script>
<style scoped>
.container {
  width: 65%;
  background-color: white;
  height: 100vh;
  flex-grow: 1;
}
span {
  color: #66788A;
}
.v-btn.text::before {
  background-color: transparent;
}
.v-btn.text:hover {
  font-weight: bold;
}
@media only screen and (max-width: 1024px) {
  .container {
  width: 100%;
  }
}
</style>
