<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";

const prefectures = ref();

onMounted(async () => {
  const getPrefectureList = await axios.get(
    import.meta.env.VITE_APP_RESAS_URL,
    {
      headers: { "X-API-KEY": import.meta.env.VITE_APP_API_KEY },
    }
  );
  prefectures.value = getPrefectureList.data.result;
});
</script>

<template>
  <h1>都道府県</h1>
  <div v-for="prefecture in prefectures">
    <label>{{ prefecture.prefName }}</label>
    <input type="checkbox" />
  </div>
</template>
