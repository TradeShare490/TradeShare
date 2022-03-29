<template>
  <div class="container mt-5 mx-auto">
    <div
      class="primary--text text-h6 text-left pb-3"
      data-cy="keyword"
    >
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
              :ticker="stock.ticker"
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
            data-cy="follow"
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
import axiosInstance from '../../axios/axios.v1'
import UserService from '../../services/User.service'

export default {
  name: 'SearchResults',
  components: {
    UserBlock,
    StockBlock
  },
  data () {
    return {
      keyword: this.$route.params.keyword,
      followings: [{
        id: '0',
        currentlyfollowing: true,
        firstname: 'Tom',
        lastname: 'Brady',
        username: 'yourMother',
        image: 'https://randomuser.me/api/portraits/men/2.jpg'

      }],
      users: [],
      stocks: [],
      isLoading: false
    }
  },
  async beforeMount () {
    this.pullPeople()
    this.pullCompanies()
  },
  methods: {
    async pullPeople () {
      try {
        const response = await axiosInstance.get(`/userInfo/?searchQuery=${this.keyword}&limit=10`)
        const list = response.data.data
        console.log(list)
        for (let index = 0; index < list.length; index++) {
          const isFollowing = await UserService.isFollowed((list[index].userId))
          const userInfo = {
            id: list[index].userId,
            currentlyfollowing: isFollowing,
            firstname: list[index].firstname,
            lastname: list[index].lastname,
            username: list[index].username,
            image: 'https://randomuser.me/api/portraits/men/15.jpg'
          }
          if (isFollowing) {
            this.followings.push(userInfo)
          } else {
            this.users.push(userInfo)
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    async pullCompanies () {
      try {
        const response = await axiosInstance.get(`/searchRecommendations/${this.keyword}`)
        const list = response.data.searchResult.bestMatches
        console.log('list')
        console.log(list)
        for (let index = 0; index < list.length; index++) {
          const companyInfo = {
            id: (index + 1).toString,
            name: list[index]['2. name'],
            ticker: list[index]['1. symbol'],
            logo: 'https://randomuser.me/api/portraits/men/15.jpg'
          }
          this.stocks.push(companyInfo)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
