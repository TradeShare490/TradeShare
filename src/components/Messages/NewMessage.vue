<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="500px"
  >
    <template #activator="{ on, attrs }">
      <v-col
        cols="12"
        align-self="center"
        class="px-7 pb-6"
      >
        <v-btn
          small
          color="primary"
          width="100%"
          data-cy="new-message"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left>
            mdi-pencil
          </v-icon>
          New Message
        </v-btn>
      </v-col>
    </template>
    <v-card class="overflow-hidden">
      <v-row>
        <v-col cols="1">
          <v-icon
            class="pt-3 pl-3"
            @click="dialog = false"
          >
            close
          </v-icon>
        </v-col>
        <v-col>
          <v-card-title class="justify-center mr-10">
            New Message
          </v-card-title>
        </v-col>
      </v-row>
      <v-container>
        <v-row>
          <v-col>
            <v-autocomplete
              v-model="select"
              :items="items"
              hide-selected
              hide-no-data
              no-filter
              color="primary"
              outlined
              label="Search..."
              item-text="name"
              item-value="name"
              flat
              append-icon="mdi-magnify"
              multiple
              :search-input.sync="searchInput"
              data-cy="chat-user"
              @input="searchInput = null"
            >
              <template #item="data">
                <v-list-item
                  @click="createConversation(data.item.name, data.item.username)"
                >
                  <v-list-item-avatar>
                    <img
                      :src="`https://randomuser.me/api/portraits/men/52.jpg`"
                      :alt="altText"
                    >
                  </v-list-item-avatar>
                  <v-list-item-content data-cy="list-item">
                    <v-list-item-title>
                      {{ data.item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      @{{ data.item.username }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
          <!--          <v-col class="pt-5">-->
          <!--            <v-btn-->
          <!--              class="justify center"-->
          <!--              color="primary"-->
          <!--              data-cy="next-button"-->
          <!--              @click="createConversation(select)"-->
          <!--            >-->
          <!--              Next-->
          <!--            </v-btn>-->
          <!--          </v-col>-->
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from '../../axios/axios.v1'
export default {
  name: 'NewMessage',
  data () {
    return {
      dialog: '',
      select: '',
      searchInput: null,
      isLoading: false,
      searchQueue: [],
      altText: 'User avatar',
      users: []
    }
  },
  computed: {
    items () {
      return this.users.map((user) => {
        return {
          username: user.username,
          name: user.firstname + ' ' + user.lastname
        }
      })
    },
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  watch: {
    async searchInput (val) {
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
        this.loading = true
        axios.get(`/userInfo/?username=${val}`).then((res) => {
          this.users = res.data.data
          console.log(res.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => (this.loading = false))
      }
    }
  },
  methods: {
    remove (item) {
      const index = this.select.indexOf(item.name)
      if (index >= 0) this.select.splice(index, 1)
    },
    createConversation (name, username) {
      if (name.length > 0 && username.length > 0) {
        this.dialog = false

        axios.post('/conversation', {
          sender: this.user.username,
          receiver: username,
          senderName: this.user.firstname + ' ' + this.user.lastname,
          receiverName: name
        }).then((res) => {
          console.log(res.data)
          this.$root.$refs.ChatMenu.initialize()
          this.$root.$refs.ChatMenu.conversationSelected(name, username, 'https://randomuser.me/api/portraits/women/17.jpg', res.data.conversation._id)
        })
      }
    }
  }
}
</script>
