<template>
  <v-card
    :min-width="$vuetify.breakpoint.smAndUp ? 250 : 350"
    min-height="168"
  >
    <v-container
      class="d-flex flex-column justify-space-between"
      fluid
    >
      <v-row>
        <v-col
          cols="8"
          class="text-left pr-0"
        >
          <!-- Card Title -->
          <div class="text-overline">
            {{ title }}
          </div>
          <!-- Card Value -->
          <div class="font-weight-bold text-h5 pb-1">
            {{ value }}
          </div>
          <!-- Only show if a percentChange is passed through the component -->
          <v-row
            :style="{visibility: percentChange ? 'visible' : 'hidden'}"
            align="center"
            no-gutters
          >
            <v-col
              cols="1"
              class="mr-3"
            >
              <v-icon
                :class="[percentChangeTextColor()]"
                class="float-left"
              >
                {{ percentChangeLogo() }}
              </v-icon>
            </v-col>
            <v-col cols="2">
              <v-list-item-title
                :class="[percentChangeTextColor()]"
                class="float-left"
              >
                {{ percentChange }}%
              </v-list-item-title>
            </v-col>
            <v-col
              cols="8"
              class="pl-4"
            >
              <v-list-item-title class="text-caption">
                Since last month
              </v-list-item-title>
            </v-col>
          </v-row>
          <!-- Only show for Goal Tracker if progress attribute is passed through -->
          <v-progress-linear
            :style="{visibility: progress ? 'visible' : 'hidden'}"
            :value="progress"
          />
        </v-col>
        <!-- Top right Icon -->
        <v-col
          cols="3"
          align-self="center"
        >
          <v-icon
            :class="[percentChangeLogoColor()]"
            class="rounded-circle pa-4"
            dark
            large
          >
            {{ icon }}
          </v-icon>
        </v-col>
      </v-row>
      <!-- TODO Implement privacy functionality to change the lock and message -->
      <v-row>
        <v-col class="d-flex">
          <v-icon
            dark
            class="blue--text float-left pr-1"
          >
            mdi-lock-outline
          </v-icon>
          <v-list-item-title class="font-weight-bold float-left text-caption text-left">
            Only you can see this
          </v-list-item-title>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'PortfolioAnalyticsTemplate',
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
    },
    progress: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      test: 'green'
    }
  },
  methods: {
    percentChangeTextColor () {
      if (this.percentChange > 0) {
        return 'green--text'
      } else if (this.percentChange < 0) {
        return 'red--text'
      } else {
        return 'grey--text'
      }
    },
    percentChangeLogoColor () {
      if (this.percentChange > 0) {
        return 'green'
      } else if (this.percentChange < 0) {
        return 'red'
      } else {
        return this.color
      }
    },
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
