<template>
  <div class="container mt-0 mx-auto">
    <v-tabs centered>
      <v-tab :ripple="false">
        <em class="mdi mdi-account-multiple" />
        <span>FOLLOWERS</span>
      </v-tab>
      <v-tab :ripple="false">
        <em class="mdi mdi-exclamation" />
        <span>FOLLOW REQUESTS</span>
      </v-tab>
      <v-tab-item class="mt-5">
        <div v-if="followers.length!=0">
          <SearchViewBy />
          <div
            v-for="(follower, i) in followers"
            :key="i"
          >
            <UserBlock
              :id="follower.id"
              :currentlyfollowing="follower.currentlyfollowing"
              :name="`${follower.firstname} ${follower.lastname}`"
              :username="follower.username"
              :request="false"
            />
          </div>
        </div>
        <div
          v-else
          class="title font-weight-black text-center"
        >
          EMPTY LIST
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="mt-5" />
        <v-divider class="mx-6" />
        <UserBlock
          name="Tim Robenman"
          image="https://randomuser.me/api/portraits/men/52.jpg"
          username="timrobenman"
          :requestblock="true"
        />
        <UserBlock
          name="Mary Winchester"
          image="https://randomuser.me/api/portraits/women/79.jpg"
          username="marywinchester"
          :requestblock="true"
        />
      </v-tab-item>
    </v-tabs>
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
      followers: []
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.getFollowersHook()
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
padding: 50% 0;
}
</style>
