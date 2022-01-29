<template>
  <v-card elevation="0" class="px-6">
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
          dense
          v-model="select"
          :loading="isLoading"
          :items="users"
          :search-input="search"
          @update:search-input="(val) => (search = val)"
          class="inputfield mx-4 mt-0"
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
        />
      </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "SearchViewBy",
  data() {
    return {
      search: null,
      select: null,
      isLoading: false,
      values: [],
      items: ["Friend", "Family", "Work", "Expert", "Untagged"],
      users: [],
      listUsers: [
        "Mary Winchester",
        "John Winchester",
        "Tim Robenman",
        "Ash Britan",
        "Mac Kafe",
        "Jenny Silver",
      ],
    };
  },
  watch: {
    search(val) {
      this.users = [];
      val && val !== this.select && this.querySelections();
    },
  },
  methods: {
    querySelections(v) {
      this.isLoading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.users = this.listUsers.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>
<style scoped>
.v-text-field--outlined:hover >>> fieldset {
  border: 1px solid #3F51B5;
}
.inputfield {
  border-radius: 3px;
}
</style>
