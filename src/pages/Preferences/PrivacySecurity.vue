<template>
  <v-container fluid>
    <div :class="$vuetify.breakpoint.lgAndDown ? 'mx-3' : 'mx-8'">
      <span class="font-weight-bold d-flex justify-start mx-2 mt-3 mb-8">
        PRIVACY & SECURITY
      </span>
      <v-divider class="mb-8" />
      <div
        class="d-flex justify-start mx-12 mt-5 mb-2"
        :class="{'flex-column': $vuetify.breakpoint.xsOnly}"
      >
        <span>
          Account Privacy
        </span>
      </div>
      <div class="d-flex justify-start ml-8">
        <pre class="caption text-left">
          Limit your account viewability to those who are not following you.
          Follow requests will be required in order to view your profile.
        </pre>
      </div>
      <div class="mx-16">
        <v-switch
          v-model="privateAccount"
          label="Private Account"
          color="primary"
          hide-details
          class="mt-0 mb-8"
          :ripple="false"
        />
      </div>
      <v-divider class="mb-8" />
      <div
        class="d-flex justify-start mx-12 mt-5 mb-10"
        :class="{'flex-column': $vuetify.breakpoint.xsOnly}"
      >
        <span>
          Change Password
        </span>
        <router-link
          to="/forgotpassword"
          exact
          class="text-decoration-none caption ml-2"
          style="margin-top: 2px"
        >
          Forgot Password?
        </router-link>
      </div>
      <div :class="$vuetify.breakpoint.lgAndDown ? 'mx-5' : 'mx-16'">
        <v-form :class="$vuetify.breakpoint.xsOnly ? 'mt-8' : 'mt-12'">
          <v-row
            no-gutters
            :class="$vuetify.breakpoint.xsOnly ? 'mb-5' : 'mb-10'"
          >
            <v-spacer :class="$vuetify.breakpoint.lgAndDown ? '' : 'd-none'" />
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class="mt-2 d-flex justify-start"
            >
              <span>
                Current
              </span>
            </v-col>
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '8'"
              class="text-left"
            >
              <v-text-field
                outlined
                dense
                solo
                flat
                hide-details
              />
            </v-col>
          </v-row>
          <v-row
            no-gutters
            :class="$vuetify.breakpoint.xsOnly ? 'mb-5' : 'mb-10'"
          >
            <v-spacer :class="$vuetify.breakpoint.lgAndDown ? '' : 'd-none'" />
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class="mt-2 d-flex justify-start"
            >
              <span>
                New
              </span>
            </v-col>
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '8'"
              class="text-left"
            >
              <v-text-field
                outlined
                dense
                solo
                flat
                hide-details
              />
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="mb-10"
          >
            <v-spacer :class="$vuetify.breakpoint.lgAndDown ? '' : 'd-none'" />
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class="mt-2 d-flex justify-start"
            >
              <span>
                Confirm New
              </span>
            </v-col>
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '8'"
              class="text-left"
            >
              <v-text-field
                outlined
                dense
                solo
                flat
                hide-details
              />
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="mb-8 d-flex justify-end"
            :class="$vuetify.breakpoint.lgAndDown ? '' : 'd-flex justify-end mr-n7'"
          >
            <v-btn
              color="primary"
              :ripple="false"
              @click="savePassword"
            >
              Save
            </v-btn>
            <v-snackbar
              v-model="snackbar"
              :timeout="timeout"
              color="primary"
              right
            >
              {{ snackbarText }}
            </v-snackbar>
          </v-row>
        </v-form>
      </div>
      <v-divider class="mb-8" />
      <!-- :class="{'flex-column': $vuetify.breakpoint.xsOnly}" -->
      <div
        class="d-flex justify-start mx-12 mt-5 mb-2"
      >
        <span>
          Manage Blocked Accounts
        </span>
      </div>
      <div class="d-flex justify-start ml-8 mb-5">
        <pre class="caption text-left text-wrap ml-8">
            Blocked users can no longer view, mention, private message or send follow requests to your account.
          </pre>
      </div>
      <div :class="$vuetify.breakpoint.lgAndDown ? 'ml-16' : 'mx-16'">
        <v-row
          no-gutters
          class="mb-3"
        >
          <v-spacer />
          <v-col
            :cols="$vuetify.breakpoint.xsOnly ? '12' : '6'"
            class="mt-2 d-flex justify-start"
          >
            <span>
              Blocked Users
            </span>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.xsOnly ? '12' : '6'"
            class="text-left"
          >
            <SearchViewBy :search-list="blockedList" />
          </v-col>
        </v-row>
        <div :class="$vuetify.breakpoint.xsOnly ? 'mb-5' : 'mb-10'">
          <v-row
            v-for="(blocked, i) in blockedList"
            :key="i"
            no-gutters
            :class="$vuetify.breakpoint.lgAndDown ? '' : 'ml-5'"
          >
            <div class="d-flex justify-start mr-15 mb-2">
              <v-btn
                text
                color="primary"
                :ripple="false"
                class="text pa-0"
              >
                Unblock
              </v-btn>
            </div>
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class=" mt-2 d-flex justify-start"
            >
              <span>
                {{ blocked }}
              </span>
            </v-col>
          </v-row>
        </div>
      </div>
      <v-divider class="mb-8" />
      <div
        class="d-flex justify-start mx-12 mt-5 mb-2"
        :class="{'flex-column': $vuetify.breakpoint.xsOnly}"
      >
        <span>
          Manage Favorites
        </span>
      </div>
      <div class="d-flex justify-start ml-8 mb-5">
        <pre class="caption text-left text-wrap ml-8">
            Favorited user's portfolios will be displayed in the "Compare Returns" graph on your dashboard.
          </pre>
      </div>
      <div :class="$vuetify.breakpoint.lgAndDown ? 'ml-16' : 'mx-16'">
        <v-row
          no-gutters
          class="mb-3"
        >
          <v-spacer />
          <v-col
            :cols="$vuetify.breakpoint.xsOnly ? '12' : '6'"
            class="mt-2 d-flex justify-start"
          >
            <span>
              Favorite Users
            </span>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.xsOnly ? '12' : '6'"
            class="text-left"
          >
            <SearchViewBy :search-list="favoriteList" />
          </v-col>
        </v-row>
        <div :class="$vuetify.breakpoint.xsOnly ? 'mb-5' : 'mb-10'">
          <v-row
            v-for="(favorite, i) in favoriteList"
            :key="i"
            no-gutters
            :class="$vuetify.breakpoint.lgAndDown ? '' : 'ml-5'"
          >
            <div class="d-flex justify-start mr-15 mb-2">
              <v-btn
                text
                color="primary"
                :ripple="false"
                class="text pa-0"
              >
                Unfavorite
              </v-btn>
            </div>
            <v-col
              :cols="$vuetify.breakpoint.xsOnly ? '12' : '3'"
              class="mt-2 d-flex justify-start"
            >
              <span>
                {{ favorite }}
              </span>
            </v-col>
          </v-row>
        </div>
      </div>
      <v-divider class="mb-8" />
      <div
        class="d-flex justify-start mx-12 mt-5 mb-2"
        :class="{'flex-column': $vuetify.breakpoint.xsOnly}"
      >
        <span>
          Login Activity
        </span>
      </div>
      <div class="d-flex justify-start ml-8">
        <pre class="caption text-left">
            See where your account is logged in.
          </pre>
      </div>
      <div :class="$vuetify.breakpoint.xsOnly ? 'pb-5' : 'pb-10'">
        <pre
          v-for="(login, i) in loginActivity"
          :key="i"
          class="text-left"
        >
            {{ login.device + ' – ' + login.location }}
            {{ login.browser + ' – ' + login.when }}
          </pre>
      </div>
    </div>
  </v-container>
</template>

<script>
import SearchViewBy from '../../components/SearchViewBy/SearchViewBy.vue'

export default {
  name: 'PrivacySecurityPreferencesPage',
  components: { SearchViewBy },
  data () {
    return {
      privateAccount: false,
      blockedList: this.$store.getters.blockedUsers,
      favoriteList: this.$store.getters.favoriteUsers,
      loginActivity: this.$store.getters.loginActivity,
      timeout: 1500,
      snackbar: false,
      snackbarText: 'Password Changed Successfully'
    }
  },
  methods: {
    savePassword () {
      this.snackbar = true
    }
  }
}
</script>
<style scoped>
.container {
  width: 65%;
  background-color: white;
  height: 100%;
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
