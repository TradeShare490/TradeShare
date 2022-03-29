<template>
  <div class="container mt-0 mx-auto">
    <SearchViewBy :list="followers" />

    <v-tabs
      centered
    >
      <v-tab :ripple="false">
        <em class="mdi mdi-account-multiple" />
        <span>FOLLOWERS</span>
      </v-tab>
      <v-tab :ripple="false">
        <em class="mdi mdi-exclamation" />
        <span>FOLLOW REQUESTS</span>
      </v-tab>

      <v-tab-item

        class="mt-5"
      >
        <div
          v-if="isLoadingFollower === true"
        >
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            :width="7"
            class="mt-7"
          />
        </div>
        <div v-else>
          <div v-if="followers.length!=0">
            <div
              v-for="(follower, i) in followers"
              :key="i"
            >
              <UserBlock
                :id="follower.id"
                :currentlyfollowing="follower.currentlyfollowing"
                :name="`${follower.firstname} ${follower.lastname}`"
                :username="follower.username"
                :requestblock="false"
                :is-private="follower.isPrivate"
              />
            </div>
          </div>
          <div
            v-else
            class="title font-weight-black"
          >
            <v-container
              fill-height
              fluid
            >
              <v-row
                align="center"
                justify="center"
              >
                <v-col>You do not have any followers yet.</v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="mt-5" />
        <v-divider class="mx-6" />
        <div v-if="requests.length!=0">
          <div
            v-for="(request, i) in requests"
            :key="i"
          >
            <UserBlock
              :id="request.id"
              :currentlyfollowing="request.currentlyfollowing"
              :name="`${request.firstname} ${request.lastname}`"
              :username="request.username"
              :requestblock="true"
              :is-private="request.isPrivate"
            />
          </div>
        </div>
        <div
          v-else
          class="title font-weight-black"
        >
          <v-container
            fill-height
            fluid
          >
            <v-row
              align="center"
              justify="center"
            >
              <v-col>You do not have any follow request yet.</v-col>
            </v-row>
          </v-container>
        </div>
      </v-tab-item>
    </v-tabs>
    <v-btn @click="test">
      FOLLOWER
    </v-btn>
  </div>
</template>

<script>
import UserBlock from './../../components/FollowerFollowing/UserBlock.vue'
import SearchViewBy from '../../components/SearchViewBy/SearchViewBy.vue'
import { useFollowMixin } from './../../hooks/useFollowMixin.js'

export default {
  name: 'FollowersPage',
  components: {
    UserBlock,
    SearchViewBy
  },
  mixins: [useFollowMixin],
  data () {
    return {
      followers: [],
      requests: [],
      isLoadingFollower: true
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.getFollowersHook(this.user.userId)
      this.getFollowRequestHook(this.user.userId)
    },
    test () {
      console.log('test')
      console.log(this.followers)
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
@media only screen and (max-width: 768px) {
  .container {
  width: 100%;
}
}
.v-tab:before{
  background-color: transparent;
}
.v-tab:hover {
  color: #3F51B5;
}
.title {
  color: rgb(168, 168, 168);
  font-size: 0.5em;
}
</style>
