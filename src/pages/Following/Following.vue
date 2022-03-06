<template>
  <div class="container mt-0 mx-auto">
    <SearchViewBy />
    <div
      v-if="isLoading === true"
      class="mt-7"
    >
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        :width="7"
      />
    </div>
    <div v-else>
      <div v-if="typeof followings !== 'undefined' || followings.length!=0">
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
            <v-col>You do not following anyone yet.</v-col>
          </v-row>
        </v-container>
      </div>
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
      followings: [],
      isLoading: true
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.getFollowingsHook(this.user.userId)
      // console.log('this.followings ' + this.followings)
      // console.log(this.followings)
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
}
</style>
