<template>
  <div>
    <v-col>
      <Notifications
        :currentlyFollowing="false"
        image="https://randomuser.me/api/portraits/men/52.jpg"
        message="John Molson has followed you."
      >
      </Notifications>
    </v-col>
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
</template>

<script>
import UserBlock from "./../../components/FollowerFollowing/UserBlock.vue";
import SearchViewBy from "../../components/SearchViewBy/SearchViewBy.vue";
import Notifications from "../../components/Notification/Notifications.vue";

export default {
  name: "Followers",
  components: {
    UserBlock,
    SearchViewBy,
    Notifications,
  },
};
</script>