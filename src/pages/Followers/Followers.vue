<template>
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
            <v-col>
      <FollowNotif
      :currentlyFollowing="false"
      currentLabelColor="friend"
      currentLabelText="friend"
      image="https://randomuser.me/api/portraits/men/52.jpg"
      message="John Molson wants to follow you"
      icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/96/heavy-exclamation-mark-symbol_2757.png"
      >
      </FollowNotif>
    </v-col>
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