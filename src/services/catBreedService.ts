import { AxiosRequestConfig } from 'axios';

const API_BASE_URI = import.meta.env.VITE_API_BASE_URI;

interface Param {
  id?: string;
  page?: number;
}

export const getBreeds = (params?: Param): Partial<AxiosRequestConfig> => ({
  url: `${API_BASE_URI}/breeds`,
  method: 'GET',
  params,
});

export const getCatImage = (params?: Param): Partial<AxiosRequestConfig> => ({
  url: `${API_BASE_URI}/images/search`,
  method: 'GET',
  params: {
    breed_ids: params?.id,
    page: params?.page,
    limit: 10,
  },
});

export const getCatBreedInfoByImageId = (
  catImageId: string
): Partial<AxiosRequestConfig> => ({
  url: `${API_BASE_URI}/images/${catImageId}`,
  method: 'GET',
});
