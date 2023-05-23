<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { usePrefectureStore } from "../stores/prefectureStore";

const store = usePrefectureStore();

const populationData = ref<any>([]);

watchEffect(() => {
  populationData.value = store.selectedPopulation;
});
</script>

<template>
  <ul>
    <li v-for="data in populationData">
      <h3 class="bold text-2xl text-red-400">{{ data.name }}</h3>
      <table v-for="num in data.data" class="w-full bg-slate-100">
        <thead>
          <tr>
            <th>{{ num.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="n in num.data">
              {{ n.year }}
            </td>
          </tr>
          <tr>
            <td v-for="n in num.data">
              {{ n.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  </ul>
</template>
