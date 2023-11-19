import { useState, useEffect } from 'react';
import { getCatImage } from '../services/catBreedService';
import { CatImage } from '../types/cat.types';
import axios from 'axios';

const useCatImages = (selectedBreed: string) => {
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [prefetchedImages, setPrefetchedImages] = useState<CatImage[]>([]);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(false);

  const handleFetchError = () => {
    setShowError(true);
    setLoading(false);
  };

  /**
   * prefetch cat images of next page
   * @param currentCatImages
   */
  const prefetchImages = (currentCatImages: CatImage[]) => {
    axios(getCatImage({ id: selectedBreed, page: page + 1 }))
      .then(({ data }) => {
        // de-dupe prefetchedImages
        const imageIds = currentCatImages.map(({ id }: CatImage) => id);
        const filteredPrefetchedImages = data.filter(
          ({ id }: CatImage) => !imageIds.includes(id)
        );

        if (filteredPrefetchedImages.length > 0) {
          setPrefetchedImages(filteredPrefetchedImages);
        } else {
          setShowLoadMoreButton(false);
        }
        setLoading(false);
      })
      .catch(() => handleFetchError());
  };

  /**
   * handle response data and determine if images should be prefetched
   * @param responseData
   */
  const handleImages = (responseData: CatImage[]) => {
    setCatImages(responseData);

    if (responseData.length === 10) {
      setShowLoadMoreButton(true);
      prefetchImages(responseData);
    }
  };

  /**
   * fetch cat images of selected breed from API
   */
  const getCatImages = () => {
    axios(getCatImage({ id: selectedBreed, page }))
      .then(({ data }) => handleImages(data))
      .catch(() => handleFetchError());
  };

  useEffect(() => {
    if (selectedBreed) {
      getCatImages();
    }
  }, [selectedBreed]); // eslint-disable-line

  useEffect(() => {
    prefetchImages(catImages);
  }, [page]); // eslint-disable-line

  return {
    page,
    setPage,
    showError,
    setShowError,
    prefetchedImages,
    showLoadMoreButton,
    setShowLoadMoreButton,
    catImages,
    loading,
    setCatImages,
  };
};

export default useCatImages;
