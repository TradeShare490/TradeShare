<template>
  <v-card min-width="363" min-height="164" max-height="164" class="pa-3 white--text" color="#3F51B5">
    <v-row justify="space-between" align="start" class="mb-6">
      <v-col cols="8" class="text-left">
        <!-- Card Title -->
        <div class="text-overline" data-cy='pl-title'>{{ title }}</div>
        <!-- Card Value -->
        <div class="font-weight-bold text-h5 pb-1" data-cy='pl-value'>{{ value }}</div>
        <!-- Only show if a percentChange is passed through the component -->
      </v-col>
      <!-- Top right Empty Icon -->
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <v-icon class="float-left pr-1" size="20" color="white">{{percentChangeLogo()}}</v-icon>
        <v-list-item-title class="float-left pr-2 subtitle-2" data-cy='pl-percent-change'>{{ percentChange }}%</v-list-item-title>
        <v-list-item-title class=" float-left subtitle-2">Since last month</v-list-item-title>
      </v-col>
      <v-col>
        <v-icon class="float-right pr-1" size="20" color="white">mdi-arrow-right</v-icon>
        <v-list-item-title class="float-right subtitle-2 pr-2" >Change Audience</v-list-item-title>
      </v-col>
    </v-row>
    <!-- TODO Implement privacy functionality to change the lock and message -->

  </v-card>
</template>

<script>
export default {
  name: "MonthlyProfitLoss",
  props: {
    title: String,
    value: String,
    percentChange: Number,
  },
  data() {
    return {};
  },
  methods: {
    percentChangeLogo() {
      if (this.percentChange > 0) {
        return "mdi-trending-up";
      } else if (this.percentChange < 0) {
        return "mdi-trending-down";
      } else {
        return "mdi-circle";
      }
    },
  },
};
</script>
