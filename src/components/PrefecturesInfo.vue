<script setup lang="ts">
import { onMounted, watch } from "vue";
import { getPrefectures, getPopulation } from "../api/resas";
import { usePrefectureStore } from "../stores/prefectureStore";

const store = usePrefectureStore();

// 都道府県のリストを取得する
onMounted(async () => {
  const response = await getPrefectures();
  store.setPrefecturesList(response);
});

// 都道府県コードをもとに、その都道府県の人口を取得する機能
watch(
  () => store.selectedPrefectures,
  async (newValues, oldValues) => {
    // 最も新しくチェックした要素の特定
    const newSelectedPrefecture = newValues.filter(
      (newValue) =>
        !oldValues.find((oldValue) => oldValue.prefName === newValue.prefName)
    );
    const selected = newSelectedPrefecture[0];
    if (selected) {
      const response = await getPopulation(selected);
      store.setSelectedPopulation(selected, response);
    } else {
      // チェックが外された要素の特定
      const removedSelection = oldValues.find(
        (oldValue) => !newValues.includes(oldValue)
      );
      // チェックが外された要素のインデックスを特定
      removedSelection && store.setRemovePopulation(removedSelection);
    }
  }
);
</script>

<template>
  <h1>都道府県</h1>
  <ul class="grid grid-cols-4">
    <li
      v-for="(prefecture, index) in store.prefecturesList"
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
        v-model="store.selectedPrefectures"
      />
      <label :for="prefecture.prefName">{{ prefecture.prefName }}</label>
    </li>
  </ul>
</template>
