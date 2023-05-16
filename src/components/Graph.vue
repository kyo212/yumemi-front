<script setup lang="ts">
import { computed } from "vue";
import VueHighcharts from "vue3-highcharts";

const chartOptions = computed(() => ({
  chart: {
    type: "line",
  },
  title: {
    text: "都道府県別の人口",
  },
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  series: [
    {
      name: "Tokyo",
      data: [
        7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
      ],
    },
    {
      name: "New York",
      data: [
        -0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5,
      ],
    },
  ],
}));
</script>

<template>
  <vue-highcharts type="chart" :options="chartOptions" />
</template>
