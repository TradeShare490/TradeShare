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
        <div class="d-flex justify-end">
          <SearchViewBy :search-list="usersList" />
        </div>
        <v-divider class="mt-3 mx-6" />
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

export default {
  name: 'FollowersPage',
  components: {
    UserBlock,
    SearchViewBy
  },
  data () {
    return {
      usersList: this.$store.getters.followersFollowing
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
.v-tab:before{
  background-color: transparent;
}
.v-tab:hover {
  color: #3F51B5;
}
</style>
