<template>
  <div class="container mt-0 mx-auto">
    <v-tabs centered>
      <v-tab><em class="mdi mdi-account-multiple" />FOLLOWERS</v-tab>
      <v-tab><em class="mdi mdi-exclamation" />FOLLOW REQUESTS</v-tab>
      <v-tab-item class="mt-5">
        <SearchViewBy />
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
import UserBlock from "./../../components/FollowerFollowing/UserBlock.vue";
import SearchViewBy from "../../components/SearchViewBy/SearchViewBy.vue";

export default {
  name: "Followers",
  components: {
    UserBlock,
    SearchViewBy,
  },
};
</script>
<style scoped>
.container {
  width: 65%;
  background-color: white;
  height: 100%;
  flex-grow: 1;
}
</style>
