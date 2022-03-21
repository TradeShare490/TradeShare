<template>
  <v-list-item data-cy="company-card">
    <v-list-item-avatar
      class="avatar"
      tile
    >
      <v-img src="../../assets/TradeShare.png" />
    </v-list-item-avatar>

    <v-list-item-content class="text-left ml-3">
      <v-list-item-title>
        {{ company }} : {{ ticker }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ current_price }} : {{ percentage_variation }}%
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  name: 'CompanyCard',
  props: {
    company: {
      type: String,
      default: ''
    },
    ticker: {
      type: String,
      default: ''
    },
    imgsrc: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0
    },
    variation: {
      type: Number,
      default: 0
    }
  }
}
</script>
