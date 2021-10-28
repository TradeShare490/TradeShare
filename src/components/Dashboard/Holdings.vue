<template>
  <v-card class="mx-4" max-width="500">
    <v-row class="py-2 px-5">
      <v-col cols="10" class="pt-0">
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-left"
              >Holdings</v-list-item-title
            >
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
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer />
      <v-col cols="2"> Equities </v-col>
      <v-col cols="2"> Cash </v-col>
      <v-col cols="2"> Options </v-col>
      <v-spacer />
    </v-row>
    <v-row>
      <v-spacer />
      <v-col cols="2"> {{ equities }} </v-col>
      <v-col cols="2"> {{ cash }} </v-col>
      <v-col cols="2"> {{ options }} </v-col>
      <v-spacer />
    </v-row>
    <v-row>
      <v-col cols="3" class="d-flex align-center">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-subtitle-2 text-right"
              >Last 7 days</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-icon>arrow_right</v-icon>
      </v-col>
      <v-col cols="4" sm="6"></v-col>
      <v-col cols="3" class="d-flex align-center">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-subtitle-2 text-right"
              >Breakdown</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-icon>arrow_right</v-icon>
      </v-col>
      <v-col cols="1"></v-col>
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