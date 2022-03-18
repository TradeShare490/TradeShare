<template>
  <div class="container mt-5 mx-auto">
    <div class="primary--text text-h6 text-left pb-3">
      Search result: {{ keyword }}
    </div>
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
      <div v-if="stocks.length!=0">
        <v-card
          class="mb-6"
        >
          <div
            v-for="(stock, i) in stocks"
            :key="i"
          >
            <StockBlock
              :id="stock.id"
              :nasdaq="stock.nasdaq"
              :name="stock.name"
              :logo="stock.logo"
            />
          </div>
        </v-card>
      </div>
      <div v-if="followings.length!=0">
        <v-card
          flat
          class="pb-6"
        >
          <v-card-title class="primary--text text-h7">
            Following
          </v-card-title>
          <div
            v-for="(following, i) in followings"
            :key="i"
          >
            <UserBlock
              :id="following.id"
              :currentlyfollowing="following.currentlyfollowing"
              :name="`${following.firstname} ${following.lastname}`"
              :username="following.username"
              :image="following.image"
              :request="false"
            />
          </div>
        </v-card>
      </div>
      <div v-if="users.length!=0">
        <v-card
          flat
          class="pb-6"
        >
          <v-card-title class="primary--text text-h7">
            People
          </v-card-title>
          <div
            v-for="(user, i) in users"
            :key="i"
          >
            <UserBlock
              :id="user.id"
              :currentlyfollowing="user.currentlyfollowing"
              :name="`${user.firstname} ${user.lastname}`"
              :username="user.username"
              :image="user.image"
              :request="false"
            />
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import UserBlock from '../../components/FollowerFollowing/UserBlock.vue'
import StockBlock from '../../components/SearchStockBlock/StockBlock.vue'

export default {
  name: 'SearchResults',
  components: {
    UserBlock,
    StockBlock
  },
  data () {
    return {
      keyword: 'nv',
      followings: [
        {
          id: '1',
          currentlyfollowing: true,
          firstname: 'Bob',
          lastname: 'Dylan',
          username: 'bobdylan009',
          image: 'https://randomuser.me/api/portraits/men/68.jpg'
        },
        {
          id: '2',
          currentlyfollowing: true,
          firstname: 'Bobby',
          lastname: 'Flay',
          username: 'bobbyflay',
          image: 'https://randomuser.me/api/portraits/men/15.jpg'
        }
      ],
      users: [
        {
          id: '3',
          currentlyfollowing: false,
          firstname: 'Bob',
          lastname: 'Dylan',
          username: 'bobdylan009',
          image: 'https://randomuser.me/api/portraits/men/68.jpg'
        },
        {
          id: '4',
          currentlyfollowing: false,
          firstname: 'Bobby',
          lastname: 'Flay',
          username: 'bobbyflay',
          image: 'https://randomuser.me/api/portraits/men/15.jpg'
        }
      ],
      stocks: [
        {
          id: '1',
          name: 'NVIDIA Corporation',
          nasdaq: 'nvda',
          logo: require('../../assets/nvda_logo.png')
        },
        {
          id: '2',
          name: 'Identiv, Inc',
          nasdaq: 'inve',
          logo: require('../../assets/identiv_logo.png')
        }
      ],
      isLoading: false
    }
  }
}
</script>
