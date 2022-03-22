<template>
  <div>
    <v-card
      elevation="0"
      class="px-6"
    >
      <v-row
        no-gutters
        class="px-7"
      >
        <router-link
          :to="router"
          class="grey--text"
          style="text-decoration: none; font-size: 12px"
        >
          <v-col
            align-self="center"
            class="px-0 py-3"
            cols="2"
            sm="2"
            md="1"
            lg="1"
            xl="1"
          >
            <v-avatar
              class="profile"
              size="50"
            >
              <v-img :src="image" />
            </v-avatar>
          </v-col>
        </router-link>

        <v-col
          align-self="center"
          cols="6"
          sm="6"
          md="6"
          lg="5"
          xl="5"
          class="text-left mx-0 px-2 mt-1 py-0"
        >
          <v-list-item color="black">
            <v-list-item-content class="py-1">
              <v-list-item-title
                class="name-text text-sm-body-1 text-caption text-wrap font-weight-bold"
              >
                {{ name }}
              </v-list-item-title>
              <v-list-item-title class="text-sm-body-3 text-caption text-wrap">
                @{{ username }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-spacer />
        <template v-if="request === false">
          <v-col
            cols="4"
            sm="3"
            md="2"
            lg="2"
            xl="2"
            align-self="center"
            class="mr-3"
          >
            <v-btn
              v-if="userStat.following === true"
              v-bind="size"
              elevation="2"
              outlined
              color="primary"
              class="btn my-3 caption font-weight-bold"
              data-cy="following"
              height="32px"
              width="110px"
              @click="unfollow(0)"
            >
              <div class="text">
                Following
              </div>
            </v-btn>
            <v-btn
              v-if="userStat.following === false"
              v-bind="size"
              elevation="2"
              color="primary"
              class="btn my-3 caption font-weight-bold"
              data-cy="follow"
              height="32px"
              width="110px"
              @click="follow(0)"
            >
              <div class="text">
                Follow
              </div>
            </v-btn>
          </v-col>
        </template>
        <template v-if="request === true">
          <v-col
            cols="3"
            sm="3"
            md="3"
            lg="2"
            xl="2"
            align-self="center"
            class="mr-3"
          >
            <v-btn
              v-bind="size"
              elevation="2"
              color="primary"
              class="btn my-3 caption font-weight-bold"
              data-cy="follow"
              height="32px"
              width="110px"
              @click="confirmFollowRequest"
            >
              <div class="text">
                CONFIRM
              </div>
            </v-btn>
          </v-col>
          <v-col
            cols="3"
            sm="3"
            md="3"
            lg="2"
            xl="2"
            align-self="center"
            class="mr-3"
          >
            <v-btn
              v-bind="size"
              elevation="2"
              color="primary"
              outlined
              class="btn my-3 caption font-weight-bold"
              data-cy="follow"
              height="32px"
              width="110px"
              @click="rejectFollowRequest"
            >
              <div class="text">
                DELETE
              </div>
            </v-btn>
          </v-col>
        </template>
      </v-row>
      <v-divider />
    </v-card>
    <v-snackbar
      v-model="snackbarFollow"
      :timeout="snackbarTimeout"
      :color="snackbarColor"
    >
      {{ snackbarText }}
      <template #action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { useFollowMixin } from '../../hooks/useFollowMixin.js'
export default {
  name: 'UserBlock',
  mixins: [useFollowMixin],
  props: {
    id: {
      type: String,
      default: ''
    },
    currentlyfollowing: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: require('../../assets/default_user.png')
    },
    username: {
      type: String,
      default: ''
    },
    requestblock: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      userStat: { following: this.currentlyfollowing },
      request: this.requestblock,
      snackbarFollow: false,
      snackbarText: 'snackbarText',
      snackbarColor: 'primary',
      snackbarTimeout: 1000,
      router: '/dashboard/' + this.id
      // following: this.currentlyfollowing
    }
  },
  computed: {
    size () {
      const size = {
        xs: 'x-small',
        sm: 'small',
        md: 'small',
        lg: 'small',
        xl: 'small'
      }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    }

  }
}
</script>
<style scoped>
.btn {
  border-radius: 3px;
  border-width: 2px;
  height: 5px;
}
.text {
  font-size: 1.1em;
}
</style>
