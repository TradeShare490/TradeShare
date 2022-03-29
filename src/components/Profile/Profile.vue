<template>
  <v-card
    class="d-flex mx-4 my-5"
    :class="{'ml-16': $vuetify.breakpoint.xsOnly}"
    height="25vh"
    width="50vw"
    min-width="385px"
  >
    <v-row no-gutters>
      <v-col
        align-self="center"
        cols="3"
      >
        <v-avatar
          class="profile"
          color="grey"
          size="65%"
          @click="test"
        >
          <v-img :src="image" />
        </v-avatar>
      </v-col>
      <v-col
        align-self="center"
        class="text-left pl-0"
        cols="4"
      >
        <v-list-item
          color="black"
          data-cy="basic-profile-info"
        >
          <v-list-item-content>
            <v-list-item-title
              class="text-h6 text-xs-body-2 text-wrap font-weight-bold"
            >
              {{ otheruser.firstname }} {{ otheruser.lastname }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-subtitle-1">
              @{{ otheruser.username }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-wrap">
              Member since {{ otheruser.date }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        align-self="center"
        cols="4"
      >
        <v-row no-gutters>
          <v-col>
            <v-list-item-title
              class="font-weight-bold"
              data-cy="profile-num-followers"
            >
              {{ otheruser.numFollowers }}
            </v-list-item-title>
          </v-col>
          <v-col>
            <v-list-item-title
              class="font-weight-bold"
              data-cy="profile-num-following"
            >
              {{ otheruser.numFollowing }}
            </v-list-item-title>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-list-item-subtitle> Followers </v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle> Following </v-list-item-subtitle>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="my-2"
        >
          <v-col
            xl="8"
            lg="6"
            md="12"
            xs="12"
            :class="{'mb-2': $vuetify.breakpoint.mdAndDown}"
          >
            <v-btn
              v-if="userStat.sentFollowRequest === true"
              block
              small
              elevation="0"
              outlined
              color="primary"
              :ripple="false"
              class="caption mr-1"
              data-cy="following"
              @click="handleUnfollow"
            >
              Sent Request
            </v-btn>
            <div v-else>
              <v-btn
                v-if="otheruser.following=== true"
                block
                small
                elevation="0"
                outlined
                color="primary"
                :ripple="false"
                class="caption"
                data-cy="following"
                @click="handleUnfollow"
              >
                Following
              </v-btn>
              <v-btn
                v-if="otheruser.following === false"
                block
                small
                elevation="0"
                color="primary"
                :ripple="false"
                class="caption"
                data-cy="follow"
                @click="handleFollow"
              >
                Follow
              </v-btn>
            </div>
          </v-col>
          <v-col
            xl="2"
            lg="3"
            xs="6"
          >
            <v-btn
              class="caption"
              :class="{'ml-1': $vuetify.breakpoint.lgAndDown}"
              small
              elevation="0"
              outlined
              :ripple="false"
              color="primary"
              @click="favorite = !favorite"
            >
              <v-icon> {{ !favorite ? 'mdi-star-outline' : 'mdi-star' }} </v-icon>
            </v-btn>
          </v-col>
          <v-col
            xl="2"
            lg="3"
            xs="6"
          >
            <v-btn
              class="caption"
              style="background-color: #BF0E08; border: none"
              small
              elevation="0"
              outlined
              :ripple="false"
              @click="blockUser()"
            >
              <v-icon
                color="white"
              >
                {{ 'mdi-cancel mdi-rotate-90' }}
              </v-icon>
            </v-btn>
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
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-btn
            block
            small
            elevation="0"
            class="caption"
            color="primary"
            :ripple="false"
            data-cy="message"
            @click="message"
          >
            Send a Message
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { useFollowMixin } from '../../hooks/useFollowMixin.js'
export default {
  name: 'ProfileInfo',
  mixins: [useFollowMixin],
  props: {
    otheruser: {
      type: Object,
      default: null
    },
    currentlyfollowing: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: require('../../assets/default_user.png')
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      userStat: { following: this.otheruser.following, sentFollowRequest: false },
      favorite: false,
      blocked: false,
      snackbarFollow: false,
      snackbarText: 'snackbarText',
      snackbarColor: 'primary',
      snackbarTimeout: 3000
    }
  },
  computed: {
    id () {
      return this.otheruser.userId
    },
    name () {
      return this.otheruser.username
    }
  },
  methods: {
    test () {
      console.log('profile.test()')
      console.log('private?' + this.isPrivate)
    },
    message () {
      console.log('sending a message...')
    },
    blockUser () {
      this.snackbar = true
      this.blocked = true
    },
    async handleFollow () {
      console.log('handleFollow private===' + this.isPrivate)
      if (this.isPrivate) {
        console.log('this is a private acc')
        this.sendFollowRequest()
        this.userStat.sentFollowRequest = true
        console.log(this.userStat)
      } else {
        this.follow(1)
      }
    },
    async handleUnfollow () {
      this.unfollow(1)
    }
  }
}
</script>
