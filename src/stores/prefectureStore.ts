import { defineStore } from "pinia";
import { SelectedPrefectures, SelectedPopulation } from "../types/index";

export const usePrefectureStore = defineStore("prefecture", {
  state: () => ({
    prefecturesList: [] as SelectedPrefectures[],
    selectedPrefectures: [] as SelectedPrefectures[],
    selectedPopulation: [] as SelectedPopulation[],
  }),
  actions: {
    setPrefecturesList(prefList: SelectedPrefectures[]) {
      this.prefecturesList = prefList;
    },
    setSelectedPopulation(
      selected: SelectedPrefectures,
      response: SelectedPopulation
    ) {
      this.selectedPopulation.push({
        prefCode: selected.prefCode,
        data: response.data,
      });
    },
    setRemovePopulation(removedSelection: SelectedPrefectures) {
      const removeIndex = this.selectedPopulation.findIndex(
        (population) => population.prefCode === removedSelection?.prefCode
      );
      this.selectedPopulation.splice(removeIndex, 1);
    },
  },
});
