<template>
  <v-card
    elevation="0"
    class="px-6"
  >
    <v-row>
      <v-spacer />
      <v-col
        cols="12"
        sm="4"
        md="5"
        lg="4"
        xl="4"
        align-self="center"
        class="pb-3 px-0"
        order="first"
        order-sm="2"
        order-md="2"
        order-lg="2"
        order-xl="2"
      >
        <v-autocomplete
          v-model="select"
          dense
          :loading="isLoading"
          :items="users"
          :search-input="search"
          item-text="name"
          class="inputfield mt-0"
          flat
          hide-no-data
          hide-details
          label="Search"
          color="primary"
          hide-selected
          single
          line
          outlined
          return-object
          append-icon="mdi-magnify"
          solo
          data-cy="search"
          :filter="customFilter"
          auto-select-first
          @click="load"
        >
          <template #item="data">
            <v-list-item
              class="text-left text-body-2"
              data-cy="search-result"
              @click="redirect(data)"
            >
              {{ data.item.name }}
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-divider class="mt-3" />
  </v-card>
</template>

<script>
export default {
  name: 'SearchViewBy',
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      search: null,
      select: null,
      isLoading: false,
      values: [],
      users: []
    }
  },
  watch: {
    search (val) {
      this.users = []
      val && val !== this.select && this.querySelections(val)
    }
  },
  methods: {
    load () {
      const tempArray = []
      this.list.forEach(el => {
        tempArray.push({ name: (el.firstname + ' ' + el.lastname).trim(), username: el.username, id: el.id })
      })
      this.users = tempArray
    },
    redirect (d) {
      this.$router.push('/dashboard/' + d.item.id)
    },
    customFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const textTwo = item.username.toLowerCase()
      const searchText = queryText.toLowerCase()
      return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
    }
  }
}
</script>
<style scoped>
.v-text-field--outlined:hover >>> fieldset {
  border: 1px solid #3F51B5;
}
.inputfield {
  border-radius: 3px;
}
</style>
