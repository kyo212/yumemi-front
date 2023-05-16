<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { SelectedPrefectures, SelectedPopulation } from "../types/index";
import { getPrefectures, getPopulation } from "../api/resas";

const prefecturesList = ref<SelectedPrefectures[]>([]);
const selectedPrefectures = ref<SelectedPrefectures[]>([]); // APIからのレスポンスに基づく値を持つ
const selectedPopulation = ref<SelectedPopulation[]>([]); // ユーザーの選択に基づく値を持つ

// 都道府県のリストを取得する
// 都道府県コード0~46, 都道府県名
onMounted(async () => {
  const response = await getPrefectures();
  prefecturesList.value = response;
});

// 取得した都道府県情報の中の都道府県コードを利用して、その都道府県の人口を取得する機能
// 境界年度、（総人口、年少人口、生産年齢人口、老年人口）
watch(selectedPrefectures, async (newValues, oldValues) => {
  // 現在チェックされた値のみでAPIを叩くための絞り込み処理
  const newSelectedPrefecture = newValues.filter(
    (newValue) =>
      !oldValues.find((oldValue) => oldValue.prefCode === newValue.prefCode)
  );

  // チェックされた都道府県のコード（prefCode）に基づいてAPIを叩く処理。checkが外された場合、下記のコードは実行されない
  if (newSelectedPrefecture.length) {
    const response = await getPopulation(newSelectedPrefecture[0]);
    selectedPopulation.value.push({
      prefCode: newSelectedPrefecture[0].prefCode,
      data: response.data,
    });
  } else {
    // チェックが外された要素の特定。oldValues（現在チェック中の要素の１つ前の状態）の中からnewValuesに含まれない要素を抽出
    const removedSelection = oldValues.find(
      (oldValue) => !newValues.includes(oldValue)
    );
    // チェックが外れた要素を人口構成リストから削除
    // チェックが外れた要素のインデックスの特定→インデックスを基に削除
    if (removedSelection) {
      const index = selectedPopulation.value.findIndex(
        (population) => population.prefCode === removedSelection.prefCode
      );
      selectedPopulation.value.splice(index, 1);
    }
  }
});
</script>

<template>
  {{ selectedPrefectures }}
  {{ selectedPopulation }}
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
