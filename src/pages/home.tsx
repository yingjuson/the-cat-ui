import { FC, ChangeEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { getBreeds, getCatImage } from '../services/catBreedService';
import { CatBreed, CatImage } from '../types/cat.types';
import axios from 'axios';
import CatCard from '../components/CatCard';
import Select from '../components/CatBreedSelect';
import { useCatBreedContext } from '../context/catBreedContext';

const Home: FC = () => {
  const { selectedBreed, setSelectedBreed } = useCatBreedContext();
  const [page, setPage] = useState<number>(0);
  const [catBreeds, setCatBreeds] = useState<CatBreed[]>([]);
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [prefetchedImages, setPrefetchedImages] = useState<CatImage[]>([]);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(false);

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
      })
      .catch((error) => console.log({ error }));
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
      .catch((error) => console.log({ error }));
  };

  /**
   * concatenate prefetched images to current image list
   */
  const concatPrefetchedImages = () => {
    const combined = [...catImages, ...prefetchedImages];
    setCatImages(combined);
    setPage((prev) => prev + 1);
  };

  /**
   * handle BreedSelect's onchange event
   * @param e
   */
  const handleBreedSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(e.target.value);
    setShowLoadMoreButton(false);
    setCatImages([]);
  };

  useEffect(() => {
    (() => {
      axios(getBreeds())
        .then(({ data }) => setCatBreeds(data))
        .catch((error) => console.log({ error }));
    })();
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      getCatImages();
    }
  }, [selectedBreed]); // eslint-disable-line

  useEffect(() => {
    prefetchImages(catImages);
  }, [page]); // eslint-disable-line

  return (
    <Container className="home">
      <h1>Cat Browser</h1>
      <Select catBreeds={catBreeds} onChangeFn={handleBreedSelect} />
      <div className="home__cat-cards-container">
        {catImages.map((catImage) => (
          <CatCard key={catImage.id} catImage={catImage} />
        ))}
      </div>
      {showLoadMoreButton && (
        <Button onClick={concatPrefetchedImages}>Load more</Button>
      )}
    </Container>
  );
};

export default Home;
