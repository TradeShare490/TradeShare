<template>
  <div class="container mt-0 mx-auto">
    <SearchViewBy />
    <div
      v-for="(following, i) in followings"
      :key="i"
    >
      <UserBlock
        :currentlyfollowing="true"
        :name="`${following.firstname} ${following.lastname}`"
        :username="following.username"
        :request="false"
      />
    </div>

    <v-btn
      color="primary"
      block
      @click="test"
    >
      this.followings
    </v-btn>
    <UserBlock
      :currentlyfollowing="true"
      name="Tim Robenman"
      image="https://randomuser.me/api/portraits/men/52.jpg"
      username="timrobenman"
    />
    <UserBlock
      :currentlyfollowing="false"
      name="John Winchester"
      image="https://randomuser.me/api/portraits/men/75.jpg"
      username="johnwinchester"
    />
  </div>
</template>

<script>
import UserBlock from './../../components/FollowerFollowing/UserBlock.vue'
import SearchViewBy from '../../components/SearchViewBy/SearchViewBy.vue'
import UserService from '../../services/User.service'

export default {
  name: 'FollowingPage',
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
      followings: []
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
        this.followings = await UserService.getFollowing(this.user.userId)
      } catch (err) {
        console.log(err)
      }
    },
    test () {
      console.log(this.followings)
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
</style>
