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
        <SearchViewBy />
        <div
          v-for="(follower, i) in followers"
          :key="i"
        >
          <UserBlock
            :currentlyfollowing="follower.currentlyfollowing"
            :name="`${follower.firstname} ${follower.lastname}`"
            :username="follower.username"
            :request="false"
          />
        </div>

        <v-btn
          color="primary"
          block
          @click="test"
        >
          this.followers
        </v-btn>
        <UserBlock
          :currentlyfollowing="true"
          name="Tim Robenman"
          image="https://randomuser.me/api/portraits/men/52.jpg"
          username="timrobenman"
        />
        <UserBlock
          :currentlyfollowing="false"
          name="Mary Winchester"
          image="https://randomuser.me/api/portraits/women/79.jpg"
          username="marywinchester"
        />
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
import UserService from '../../services/User.service'

export default {
  name: 'FollowersPage',
  components: {
    UserBlock,
    SearchViewBy
  },
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      account: Object,
      followers: []
    }
  },
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.account = await UserService.getAccount(this.user.userId)
      try {
        this.followers = await UserService.getFollowers(this.user.userId)
      } catch (err) {
        console.log(err)
      }
    },
    test () {
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
</style>
