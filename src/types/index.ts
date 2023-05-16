export type SelectedPrefectures = {
  prefCode: number;
  prefName: string;
};

export type SelectedPopulation = {
  prefCode: number;
  data: [{ label: number; data: [{ year: string; value: number }] }];
};
