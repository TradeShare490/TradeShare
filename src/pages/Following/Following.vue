<template>
  <div class="container mt-0 mx-auto">
    <SearchViewBy />
    <UserBlock
      :currentlyFollowing="true"
      name="Tim Robenman"
      image="https://randomuser.me/api/portraits/men/52.jpg"
      username="timrobenman"
    ></UserBlock>
    <UserBlock
      :currentlyFollowing="true"
      name="John Winchester"
      image="https://randomuser.me/api/portraits/men/75.jpg"
      username="johnwinchester"
    ></UserBlock>
  </div>
</template>

<script>
import UserBlock from "./../../components/FollowerFollowing/UserBlock.vue";
import SearchViewBy from "../../components/SearchViewBy/SearchViewBy.vue";

export default {
  name: "Following",
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