<template>
  <v-card
    :min-width="$vuetify.breakpoint.smAndUp ? 250 : 350"
    min-height="168"
    class="pa-3 white--text d-flex flex-column"
    color="#3F51B5"
  >
    <v-row
      justify="space-between"
      align="start"
      class="mb-6"
      no-gutters
    >
      <v-col
        cols="9"
        class="text-left"
      >
        <!-- Card Title -->
        <div
          class="text-overline"
          data-cy="pl-title"
        >
          {{ title }}
        </div>
        <!-- Card Value -->
        <div
          class="font-weight-bold text-h5 pb-1"
          data-cy="pl-value"
        >
          {{ value }}
        </div>
        <!-- Only show if a percentChange is passed through the component -->
      </v-col>
      <!-- Top right Empty Icon -->
    </v-row>
    <v-row
      align="center"
      no-gutters
    >
      <v-col>
        <v-icon
          class="float-left pr-1"
          size="20"
          color="white"
        >
          {{ percentChangeLogo() }}
        </v-icon>
        <v-list-item-title
          class="float-left pr-2 subtitle-2"
          data-cy="pl-percent-change"
        >
          {{ percentChange }}%
        </v-list-item-title>
        <v-list-item-title class="float-left subtitle-2">
          Since last month
        </v-list-item-title>
      </v-col>
    </v-row>
    <!-- TODO Implement privacy functionality to change the lock and message -->
  </v-card>
</template>

<script>
export default {
  name: 'MonthlyProfitLoss',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    percentChange: {
      type: Number,
      default: 0
    }
  },
  methods: {
    percentChangeLogo () {
      if (this.percentChange > 0) {
        return 'mdi-trending-up'
      } else if (this.percentChange < 0) {
        return 'mdi-trending-down'
      } else {
        return 'mdi-circle'
      }
    }
  }
}
</script>
