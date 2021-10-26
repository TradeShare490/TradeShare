<template>
  <v-card class="mx-4">
    <v-row>
      <v-col> Holdings </v-col>
      <v-col> <v-icon>mdi-reload</v-icon> </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col>
        <div><HoldingsPieChart :equities="this.equities" :cash="this.cash" :options="this.options"/></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col> Equities </v-col>
      <v-col> Cash </v-col>
      <v-col> Options </v-col>
    </v-row>
    <v-row>
      <v-col> {{ equities }} </v-col>
      <v-col> {{ cash }} </v-col>
      <v-col> {{ options }} </v-col>
    </v-row>
    <v-row>
      <v-col> days </v-col>
      <v-col> breakdown </v-col>
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

<style>
</style>