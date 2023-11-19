import { AxiosRequestConfig } from 'axios';

const API_BASE_URI = import.meta.env.VITE_API_BASE_URI;

interface Params {
  id: string;
  page: number;
}

export const getBreeds = (): Partial<AxiosRequestConfig> => ({
  url: `${API_BASE_URI}/breeds`,
  method: 'GET',
});

export const getCatImage = (params: Params): Partial<AxiosRequestConfig> => ({
  url: `${API_BASE_URI}/images/search`,
  method: 'GET',
  params: {
    breed_ids: params.id,
    page: params.page,
    limit: 10,
  },
});

export const getCatBreedInfoByImageId = (
  catImageId: string
): Partial<AxiosRequestConfig> => ({
  url: `${API_BASE_URI}/images/${catImageId}`,
  method: 'GET',
});
