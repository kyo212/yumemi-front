import axios from "axios";
import { SelectedPrefectures } from "../types/index";

export const getPrefectures = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_RESAS_PREFECTURES_URL,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_APP_API_KEY },
      }
    );
    return response.data.result;
  } catch (err) {
    return console.log(err);
  }
};
export const getPopulation = async (
  selectedPrefucture: SelectedPrefectures
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_RESAS_POPULATION_URL}?prefCode=${
        selectedPrefucture.prefCode
      }`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_APP_API_KEY },
      }
    );
    return response.data.result;
  } catch (err) {
    return console.log(err);
  }
};
