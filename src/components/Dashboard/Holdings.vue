<template>
  <v-card elevation="1" outlined min-width="350">
    <v-row class="py-2 px-5">
      <v-col cols="10" class="pt-0">
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-left">
              Holdings
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="2" class="d-flex align-center pt-0 justify-end">
        <v-icon class="float-right">mdi-reload</v-icon>
      </v-col>
    </v-row>
    <v-divider />
    <v-row class="py-5">
      <v-col class="d-flex justify-center">
        <div class="piechart">
          <HoldingsPieChart
            :equities="this.equities"
            :cash="this.cash"
            :options="this.options"
            data-cy="pie-chart"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer />
      <v-col cols="4" sm="3" md="3"> Equities </v-col>
      <v-col cols="4" sm="3" md="3"> Cash </v-col>
      <v-col cols="4" sm="3" md="3"> Options </v-col>
      <v-spacer />
    </v-row>
    <v-row>
      <v-spacer />
      <v-col cols="4" sm="3" md="3" class="pa-0">
        <div class="text-h5 blue--text text--darken-2" data-cy="equities-value">
          {{ equities }}
        </div>
      </v-col>
      <v-col cols="4" sm="3" md="3" class="pa-0">
        <div class="text-h5 green--text text--darken-3" data-cy="cash-value">
          {{ cash }}
        </div>
      </v-col>
      <v-col cols="4" sm="3" md="3" class="pa-0">
        <div class="text-h5 black--text" data-cy="options-value">
          {{ options }}
        </div>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row>
      <v-col cols="6" class="d-flex align-center pl-10">
        <p class="text-subtitle-2 align-center ma-0">Last 7 days</p>
        <v-icon>arrow_right</v-icon>
      </v-col>
      <v-col cols="6" class="d-flex align-center pr-10">
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-title class="text-subtitle-2 text-right"
              >Breakdown</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-icon>arrow_right</v-icon>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import HoldingsPieChart from "./HoldingsPieChart.vue";

export default {
  data() {
    return {
      equities: 63,
      cash: 15,
      options: 22,
    };
  },
  components: {
    HoldingsPieChart,
  },
};
</script>

<style scoped>
.piechart {
  width: 50%;
}
</style>
