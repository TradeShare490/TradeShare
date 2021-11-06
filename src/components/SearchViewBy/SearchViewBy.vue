<template>
  <v-card elevation="0" class="px-6 pb-0 pt-5">
    <v-row>
      <v-col
        align-self="center"
        cols="12"
        sm="8"
        md="6"
        lg="5"
        xl="5"
        class="py-0"
      >
        <p class="text-overline pt-2 float-left pr-5 mb-0 mt-5">
          View by group
        </p>
        <v-autocomplete
          class="mt-6"
          v-model="values"
          :items="items"
          dense
          chips
          small-chips
          label="Select label"
          solo
          multiple
          return-object
          data-cy="sort-label"
        ></v-autocomplete>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
        cols="12"
        sm="4"
        md="5"
        lg="4"
        xl="4"
        align-self="center"
        class="py-0 px-0"
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
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="Search"
          outlined
          color="primary"
          hide-selected
          single
          line
          height="10px"
          return-object
          data-cy="search"
        ></v-autocomplete>
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
            return (
              (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
            );
          });
          this.isLoading = false;
        }, 500);
      },
    },
  };
</script>
