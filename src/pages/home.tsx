import { FC, ChangeEvent, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { getBreeds, getCatImage } from '../services/catBreedService';
import axios from 'axios';
import { CatBreed, CatImage } from '../types/cat.types';
import CatCard from '../components/CatCard';
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
      <Form>
        <Form.Group controlId="form-cat-breed">
          <Form.Label>Breed</Form.Label>
          <Form.Select
            aria-label="select breed"
            size="lg"
            value={selectedBreed}
            disabled={false}
            className="home__cat-breed-selector"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setSelectedBreed(e.target.value);
              setShowLoadMoreButton(false);
              setCatImages([]);
            }}
          >
            {catBreeds.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
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
