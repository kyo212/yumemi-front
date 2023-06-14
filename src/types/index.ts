export type SelectedPrefectures = {
  prefCode: number;
  prefName: string;
};

export type SelectedPopulation = {
  name: string;
  data: [{ label: number; data: [{ year: string; value: number }] }];
};
