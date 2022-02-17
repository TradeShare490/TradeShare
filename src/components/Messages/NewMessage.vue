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
          <v-col
            cols="8"
            class="pl-8"
          >
            <v-autocomplete
              v-model="select"
              :items="people"
              hide-selected
              hide-no-data
              color="primary"
              small-chips
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
              <template #selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template #item="data">
                <v-list-item-avatar>
                  <img
                    :src="data.item.avatar"
                    :alt="altText"
                  >
                </v-list-item-avatar>
                <v-list-item-content data-cy="list-item">
                  <v-list-item-title>
                    {{ data.item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ data.item.username }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col class="pt-5">
            <v-btn
              class="justify center"
              color="primary"
              data-cy="next-button"
              @click="createConversation(select)"
            >
              Next
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'NewMessage',
  data () {
    return {
      dialog: '',
      select: '',
      searchInput: null,
      altText: 'User avatar',
      people: [
        {
          id: 1,
          name: 'John Doe',
          username: '@johndoe',
          avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
        },
        {
          id: 2,
          name: 'Jane Doe',
          username: '@janedoe',
          avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
        }
      ]
    }
  },
  methods: {
    remove (item) {
      const index = this.select.indexOf(item.name)
      if (index >= 0) this.select.splice(index, 1)
    },
    createConversation (select) {
      if (select.length > 0) {
        this.dialog = false
        alert('You created a new conversation!')
      }
    }
  }
}
</script>
