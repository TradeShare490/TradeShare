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
        {{ title }}
      </v-list-item-title>
      <v-list-item-subtitle :class="sold ? 'red--text' : 'black--text'">
        {{ subtitle }}
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
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    imgsrc: {
      type: String,
      default: ''
    },
    sold: {
      type: Boolean,
      default: false
    }
  }
}
</script>
