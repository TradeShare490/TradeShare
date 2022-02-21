<template>
  <div class="container mt-0 mx-auto">
    <SearchViewBy />
    <div
      v-for="(following, i) in followings"
      :key="i"
    >
      <UserBlock
        :id="following.id"
        :currentlyfollowing="following.currentlyfollowing"
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
import { useFollowMixin } from '../../hooks/useFollowMixin.js'
// import UserService from '../../services/User.service'

export default {
  name: 'FollowingPage',
  components: {
    UserBlock,
    SearchViewBy
  },
  mixins: [useFollowMixin],
  data () {
    return {
      followings: []
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.getFollowingsHook()
    },
    test () {
      console.log(this.followings)
      this.snackbarFollow = true
      // console.log(this.user.userId)
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
