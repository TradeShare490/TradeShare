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
        <v-btn @click="test">
          TEST
        </v-btn>
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
          @click="test"
        >
          <!-- @update:search-input="(val) => (search = val)" -->
          <template #item="data">
            <v-list-item
              class="text-left text-body-2"
              data-cy="autocomplete-list-item"
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
      console.log('search->' + val)
      val && val !== this.select && this.querySelections(val)
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      // console.log('SearchViewBy.initialize()')
      // console.log('this.list')
      // console.log(this.list)
      // this.users = this.list
      // console.log('end initialize')
      // console.log(this.users)
    },
    test () {
      console.log('test()')
      console.log(this.list)
      const tempArray = []
      this.list.forEach(el => {
        tempArray.push({ name: el.firstname + ' ' + el.lastname, username: el.username, id: el.id })
        // el.name = el.firstname + ' ' + el.lastname
        // delete el.currentlyfollowing
        // delete el.firstname
        // delete el.lastname
        // console.log(el)
      })
      console.log('tempArray')
      console.log(tempArray)
      this.users = tempArray
      console.log(this.users)
    },
    redirect (d) {
      console.log('redirect ')
      console.log(d)
      console.log(d.item.username)
      console.log(d.item.name)
      console.log(d.item.id)
      this.$router.push('/dashboard/' + d.item.id)
    },
    querySelections (v) {
      console.log('querySelections()->' + v)
      // this.isLoading = true
      // setTimeout(() => {
      //   this.users = this.list.filter((e) => {
      //     return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
      //   })
      //   this.isLoading = false
      // }, 500)
    },
    customFilter (item, queryText, itemText) {
      console.log('customFilter')
      console.log(item)
      console.log(queryText)
      console.log(itemText)
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
