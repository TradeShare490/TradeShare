<template>
  <div>
    <v-app-bar
      color="primary"
      dark
      app
      clipped-left
    >
      <router-link to="/">
        <v-img
          src="../../assets/TS_Logo_White.png"
          alt="TradeShare Logo"
          contain
          max-width="70px"
          height="60px"
          position="left"
        />
      </router-link>
      <v-toolbar-title class="text-h6 mr-6 hidden-sm-and-down">
        TradeShare
      </v-toolbar-title>
      <v-spacer />
      <v-autocomplete
        v-model="searchModel"
        class="shrink mr-3 mt-6"
        :items="items"
        :search-input.sync="search"
        :loading="isLoading"
        item-text="Description"
        hide-selected
        hide-no-data
        label="Search"
        append-icon="mdi-magnify"
        light
        rounded
        dense
        single-line
        solo
        data-cy="autocomplete-search-bar"
      >
        <template #item="data">
          <v-list-item
            v-if="!searchModeUsers"
            class="text-left text-body-2"
            data-cy="autocomplete-list-item"
            @click="redirect(data.item['1. symbol'])"
          >
            <strong>{{ data.item["1. symbol"] }}:</strong> &nbsp;
            {{ data.item["2. name"] }}
          </v-list-item>
          <v-list-item
            v-if="searchModeUsers"
            class="text-left text-body-2"
            data-cy="autocomplete-name-list"
          >
            {{ data.item }}
          </v-list-item>
        </template>
      </v-autocomplete>
      <v-btn
        icon
        class="Notification mt-1"
        @click="test"
      >
        <template>
          <div>
            <v-menu
              transition="slide-y-transition"
              class="NotificationContainer"
              bottom
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-bell</v-icon>
                </v-btn>
              </template>
              <v-list
                v-if="notifItems.length===0"
                three-line
                class="NotificationListEmpty"
              >
                <v-list-item class="text-center">
                  <v-col class="grey--text darken-3--text font-weight-bold">
                    YOU DO NOT HAVE ANY NOTIFICATION YET
                  </v-col>
                </v-list-item>
              </v-list>
              <v-list
                v-else
                three-line
                class="NotificationList"
              >
                <v-subheader class="subheader font-weight-bold mt-1 black--text">
                  Lastest Notification
                </v-subheader>

                <template v-for="(item, index) in notifItems">
                  <NotificationBlock
                    :key="index"
                    :avatar="item.avatar"
                    :message="item.message"
                    :date="item.date"
                    :destination="item.destination"
                    :readed="item.readed"
                  />
                </template>
              </v-list>
            </v-menu>
          </div>
        </template>
      </v-btn>
      <v-btn
        icon
        class="mt-1"
        data-cy="logout-btn"
        @click="submit"
      >
        <v-icon> mdi-logout </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { logout } from '../../hooks/useCredential.js'
import axios from '../../axios/axios.v1'
import NotificationBlock from './../../components/Notification/NotificationBlock.vue'
export default {
  name: 'NavBar',
  components: {
    NotificationBlock
  },
  data () {
    return {
      stocks: [],
      people: ['@Kevin', '@George', '@Alya', '@Siobhan'],
      searchModeUsers: false,
      isLoading: false,
      searchModel: null,
      search: null,
      searchQueue: [],
      notifItems: [
        { avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', message: 'Ali Connors I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?', date: '3/12/2021, 7:14:33 PM', readed: false },
        { message: 'to Alex, Scott, Jennifer: Wish I could come, but I\'m out of town this weekend.', date: '1/11/2019, 7:14:33 PM', readed: false },
        { avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', message: 'Sandra Adams Do you have Paris recommendations? Have you ever been?', date: '3/12/2022, 7:14:33 PM', readed: true },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false },
        { message: 'Sandra Adams: Do you have Paris recommendations? Have you ever been?', date: '1/01/2022, 7:14:33 PM', readed: true },
        { message: 'Sandra Adams: Do you have Paris recommendations? Have you ever been?', date: '1/01/2022, 7:14:33 PM', readed: true },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false },
        { message: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?', date: '1/19/2022, 7:14:33 PM', readed: false }
      ]
    }
  },
  computed: {
    /* istanbul ignore next */
    fields () {
      if (!this.searchModel) return []
      return Object.keys(this.searchModel).map((key) => {
        return {
          key,
          value: this.searchModel[key] || 'n/a'
        }
      })
    },
    items () {
      if (this.searchModeUsers) {
        return this.people
      } else {
        return this.stocks.map((stock) => {
          const Description = stock['1. symbol'] + ': ' + stock['2. name']
          return Object.assign({}, stock, { Description })
        })
      }
    }
  },
  watch: {
    async search (val) {
      // Checks if the user has typed anything in the last 2 seconds if not make a request to backend
      if (val?.charAt(0) === '@') {
        console.log('Username mode')
        this.searchModeUsers = true
      } else {
        this.searchModeUsers = false
        this.searchQueue.push(val)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        this.searchQueue.pop()
        if (this.searchQueue.length === 0) {
          if (val?.length === 0) {
            return
          }
          if (this.isLoading) {
            return
          }
          this.isLoading = true
          // Lazily load input items
          /* istanbul ignore catch */
          axios
            .get(`/searchRecommendations/${val}`)
            .then((res) => {
              this.stocks = res.data.searchResult.bestMatches
            })
            .catch((err) => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))
        }
      }
    }
  },
  methods: {
    test () {
      console.log('NOTIFICATION @CLICK')
    },
    submit () {
      logout(this.$store, this.$router)
    },
    redirect (symbol) {
      const regex = /^\S+$/
      if (regex.test(symbol)) {
        window.open('https://finance.yahoo.com/quote/' + symbol)
      }
      return true
    }
  }
}
</script>
<style scoped>
.subheader {
  font-size: 1.1em;
  color: black;
}
.NotificationList {
  background-color: #ffffff;
  width: 450px;
  min-height: 50px;
  max-height: 80vh;
  overflow:auto;
}
.NotificationListEmpty {
  width: 450px;
  height: 100px;
  overflow:hidden;
}
::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #a8a8a8;
  border-radius: 15px;
  border: 6px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #757575;
}
</style>
