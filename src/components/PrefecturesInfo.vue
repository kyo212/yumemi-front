<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { SelectedPrefectures, SelectedPopulation } from "../types/index";
import { getPrefectures, getPopulation } from "../api/resas";

const prefecturesList = ref<SelectedPrefectures[]>([]);
const selectedPrefectures = ref<SelectedPrefectures[]>([]);
const selectedPopulation = ref<SelectedPopulation[]>([]);

// 都道府県のリストを取得する
onMounted(async () => {
  const response = await getPrefectures();
  prefecturesList.value = response;
});

// 都道府県コードをもとに、その都道府県の人口を取得する機能
watch(selectedPrefectures, async (newValues, oldValues) => {
  // 最も新しくチェックした要素の特定
  const newSelectedPrefecture = newValues.filter(
    (newValue) =>
      !oldValues.find((oldValue) => oldValue.prefCode === newValue.prefCode)
  );
  const selected = newSelectedPrefecture[0];
  if (selected) {
    const response = await getPopulation(selected);
    selectedPopulation.value.push({
      prefCode: selected.prefCode,
      data: response.data,
    });
  } else {
    // チェックが外された要素の特定
    const removedSelection = oldValues.find(
      (oldValue) => !newValues.includes(oldValue)
    );
    // チェックが外された要素のインデックスを特定
    const removeIndex = selectedPopulation.value.findIndex(
      (population) => population.prefCode === removedSelection?.prefCode
    );
    selectedPopulation.value.splice(removeIndex, 1);
  }
});
</script>

<template>
  <h1>都道府県</h1>
  <ul class="grid grid-cols-4">
    <li
      v-for="(prefecture, index) in prefecturesList"
      :key="index"
      class="flex w-28"
    >
      <input
        :id="prefecture.prefName"
        type="checkbox"
        :value="{
          prefCode: prefecture.prefCode,
          prefName: prefecture.prefName,
        }"
        v-model="selectedPrefectures"
      />
      <label :for="prefecture.prefName">{{ prefecture.prefName }}</label>
    </li>
  </ul>
</template>
