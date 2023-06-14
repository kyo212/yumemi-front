import axios, { AxiosResponse } from "axios";
import { SelectedPrefectures } from "../types/index";

const apiClient = axios.create({
  headers: { "X-API-KEY": import.meta.env.VITE_APP_API_KEY },
});

const requestHandler = async (request: Promise<AxiosResponse>) => {
  try {
    const response = await request;
    return response.data.result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPrefectures = async () => {
  return requestHandler(
    apiClient.get(import.meta.env.VITE_APP_RESAS_PREFECTURES_URL)
  );
};

export const getPopulation = async (
  selectedPrefucture: SelectedPrefectures
) => {
  return requestHandler(
    apiClient.get(
      `${import.meta.env.VITE_APP_RESAS_POPULATION_URL}?prefCode=${
        selectedPrefucture.prefCode
      }`
    )
  );
};
