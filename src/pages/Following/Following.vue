<template>
  <div class="mt-5">
    <SearchViewBy />
    <UserBlock
      :currentlyFollowing="true"
      currentLabelColor="friend"
      currentLabelText="friend"
      name="Tim Robenman"
      image="https://randomuser.me/api/portraits/men/52.jpg"
    ></UserBlock>
    <UserBlock
      :currentlyFollowing="true"
      currentLabelColor="work"
      currentLabelText="work"
      name="John Winchester"
      image="https://randomuser.me/api/portraits/men/75.jpg"
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