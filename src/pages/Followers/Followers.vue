<template>
  <div>
    <UserBlock
      :currentlyFollowing="true"
      currentLabelColor="friend"
      currentLabelText="friend"
      name="Tim Robenman"
      image="https://randomuser.me/api/portraits/men/52.jpg"
    ></UserBlock>
    <UserBlock
      :currentlyFollowing="false"
      currentLabelColor="work"
      currentLabelText="work"
      name="Mary Winchester"
      image="https://randomuser.me/api/portraits/women/79.jpg"
    ></UserBlock>
  </div>
</template>

<script>
  import UserBlock from "./../../components/FollowerFollowing/UserBlock.vue";

  export default {
    name: "Followers",
    components: {
      UserBlock,
    },
  };
</script>
