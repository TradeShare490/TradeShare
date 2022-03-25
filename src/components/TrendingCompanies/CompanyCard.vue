<template>
  <v-list-item data-cy="company-card">
    <v-list-item-content class="text-left ml-3">
      <v-list-item-title>
        {{ company }}
      </v-list-item-title>
      <v-list-item-title>
        <v-chip
          label
          class="white--text px-2 text-h6"
          color="primary"
        >
          {{ ticker }}
        </v-chip>
      </v-list-item-title>

      <v-list-item-title />
      <v-row>
        <v-col>
          <v-list-item-subtitle>
            ${{ price.toFixed(2) }}
          </v-list-item-subtitle>
        </v-col>
        <v-col>
          <v-list-item-subtitle :style="{color: stockcolor }">
            {{ variation.toFixed(2) }}%
          </v-list-item-subtitle>
        </v-col>
      </v-row>
    </v-list-item-content>
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
  },
  data () {
    return {
      stockcolor: ''
    }
  },
  beforeMount () {
    this.stockColorPicker()
  },
  methods: {
    stockColorPicker () {
      if (this.variation > 0) {
        this.stockcolor = 'green'
      } else {
        this.stockcolor = 'red'
      }
    }
  }
}
</script>
