<template>
  <div>
    <div>
      <v-col>
      <FollowNotif
      :currentlyFollowing="false"
      currentLabelColor="friend"
      currentLabelText="friend"
      image="https://randomuser.me/api/portraits/men/52.jpg"
      message="John Molson has followed you."
      >
      </FollowNotif>
    </v-col>
    </div>

    <div>
    <SearchViewBy />
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
  </div>
  
</template>

<script>
  import UserBlock from "./../../components/FollowerFollowing/UserBlock.vue";
  import SearchViewBy from '../../components/SearchViewBy/SearchViewBy.vue'
  import FollowNotif from "../../components/Notification/Notifications.vue";

  export default {
    name: "Followers",
    components: {
      UserBlock,
      SearchViewBy,
      FollowNotif
    },
  };
</script>