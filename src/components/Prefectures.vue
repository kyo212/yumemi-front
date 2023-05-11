<script setup lang="ts">
import axios from "axios";
import { onMounted } from "vue";

onMounted(() => {
  axios
    .get(import.meta.env.VITE_APP_RESAS_URL, {
      headers: { "X-API-KEY": import.meta.env.VITE_APP_API_KEY },
    })
    .then(({ data }) => {
      console.log(data.result);
    });
});
</script>

<template>
  <h1>都道府県</h1>
</template>
