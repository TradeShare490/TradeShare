<template>
  <div class="container mt-0 mx-auto">
    <div v-if="followings.length!=0">
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
    </div>
    <div
      v-else
      class="title font-weight-black text-center"
    >
      EMPTY LIST
    </div>
  </div>
</template>

<script>
import UserBlock from './../../components/FollowerFollowing/UserBlock.vue'
import SearchViewBy from '../../components/SearchViewBy/SearchViewBy.vue'
import { useFollowMixin } from '../../hooks/useFollowMixin.js'

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
.title {
  color: rgb(168, 168, 168);
  font-size: 0.5em;
padding: 50% 0;
}
</style>
