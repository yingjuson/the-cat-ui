export interface CatImage {
  id: string;
  url: string;
  height: number;
  width: number;
}

export interface CatBreed {
  id: string;
  name: string;
  image: string;
  origin: string;
  description: string;
  temperament: string;
  countryCode?: string;
}
