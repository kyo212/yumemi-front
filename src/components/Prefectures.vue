<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, watch } from "vue";

type SelectedPrefectures = {
  prefCode: number;
  prefName: string;
};

type SelectedPopulation = {
  prefCode: number;
  data: any;
};

const prefecturesList = ref<SelectedPrefectures[]>([]);
const selectedPrefectures = ref<SelectedPrefectures[]>([]);
const selectedPopulation = ref<SelectedPopulation[]>([]);

// 都道府県のリストを取得する
// 都道府県コード0~46, 都道府県名
onMounted(async () => {
  await axios
    .get(import.meta.env.VITE_APP_RESAS_PREFECTURES_URL, {
      headers: { "X-API-KEY": import.meta.env.VITE_APP_API_KEY },
    })
    .then(({ data }) => {
      console.log(data.result);
      prefecturesList.value = data.result;
    })
    .catch((err) => {
      console.log(err);
    });
});

// 取得した都道府県情報の中の都道府県コードを利用して、その都道府県の人口を取得する機能
// 境界年度、（総人口、年少人口、生産年齢人口、老年人口）
watch(selectedPrefectures, async (newValues, oldValues) => {
  // checkedPrefecturesの値が変更されるたびに全ての値でAPI叩くのはパフォーマンスが悪すぎる
  const newSelectedPrefecture = newValues.filter(
    (pref) => !oldValues.find((oldValue) => oldValue.prefCode === pref.prefCode)
  );
  // const removedPrefectures = oldValues.filter(
  //   (oldPref) =>
  //     !newValues.find((newValue) => newValue.prefCode === oldPref.prefCode)
  // );
  // console.log({ newValues, oldValues });

  console.log({ newSelectedPrefecture });

  // チェックされた都道府県のコード（prefCode）に基づいてAPIを叩く処理。checkが外された場合、下記のコードは実行されない
  if (newSelectedPrefecture.length) {
    console.log("チェックされました");

    await axios
      .get(
        `${import.meta.env.VITE_APP_RESAS_POPULATION_URL}?prefCode=${
          newSelectedPrefecture[0].prefCode
        }`,
        {
          headers: { "X-API-KEY": import.meta.env.VITE_APP_API_KEY },
        }
      )
      .then((response) => {
        selectedPopulation.value.push({
          prefCode: newSelectedPrefecture[0].prefCode,
          data: response?.data?.result?.data,
        });

        console.log(response.data.result.boundaryYear);
        console.log(response.data.result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // チェックが外れた時に動く処理
    // チェックが外れた都道府県の人口構成を取得したい
    // One previous state
    // nowSelected

    // チェックが外された要素の特定。oldValues（現在チェック中の要素の１つ前の状態）の中からnewValuesに含まれない要素を抽出
    const removedSelection = oldValues.find(
      (oldValue) => !newValues.includes(oldValue)
    );
    console.log(removedSelection);

    // チェックが外れた要素を人口構成リストから削除
    // チェックが外れた要素のインデックスの特定→インデックスを基に削除
    if (removedSelection) {
      // undefindが入る可能性あり
      const index = selectedPopulation.value.findIndex(
        (population) => population.prefCode === removedSelection.prefCode
      );

      selectedPopulation.value.splice(index, 1);
    }
  }
  console.log(selectedPopulation.value);
});
</script>

<template>
  <!-- <button @click="test()">btn</button> -->
  <h1>都道府県</h1>
  {{ selectedPrefectures }}
  <div v-for="(prefectureInfo, index) in prefecturesList" :key="index">
    <label :for="prefectureInfo.prefName">{{ prefectureInfo.prefName }}</label>
    <input
      :id="prefectureInfo.prefName"
      type="checkbox"
      :value="{
        prefCode: prefectureInfo.prefCode,
        prefName: prefectureInfo.prefName,
      }"
      v-model="selectedPrefectures"
    />
  </div>
</template>
