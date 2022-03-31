<template>
  <v-card flat>
    <v-row
      no-gutters
      class="px-3"
    >
      <v-col
        class="px-0 py-3"
        cols="2"
        sm="2"
        md="1"
        lg="1"
        xl="1"
      >
        <v-avatar
          class="profile"
          size="50"
          rounded
          data-cy="logo"
        >
          <v-img :src="logo" />
        </v-avatar>
      </v-col>
      <v-col
        align-self="center"
        cols="10"
        sm="5"
        md="6"
        lg="6"
        xl="6"
        class="text-left mx-0 mt-1 py-0 pr-0"
      >
        <v-list-item color="black">
          <v-list-item-content class="py-1">
            <v-list-item-title
              class="text-caption text-wrap"
              data-cy="ticker"
            >
              <v-chip
                label
                color="primary"
                x-small
                class="text-uppercase"
              >
                {{ ticker }}
              </v-chip>
            </v-list-item-title>
            <v-list-item-title
              class="text-md-h6 text-sm-h5 text-wrap font-weight-light text-uppercase"
              data-cy="stock-name"
            >
              {{ name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-spacer class="d-none d-md-block" />
      <v-col class="d-flex align-center justify-center pr-5 pb-sm-4 pt-sm-3 pb-4 pt-2">
        <v-btn
          small
          class="py-4"
          color="primary"
          style="border-width: 2px;"
          elevation="2"
          data-cy="more-info"
          @click="redirect"
        >
          More Information
          <v-icon class="pl-2">
            mdi-launch
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider />
  </v-card>
</template>

<script>

export default {
  name: 'StockBlock',
  props: {
    id: {
      type: String,
      default: ''
    },
    ticker: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: require('../../assets/default_user.png')
    }
  },
  methods: {
    redirect () {
      window.open('https://finance.yahoo.com/quote/' + this.ticker)
    }
  }
}
</script>
