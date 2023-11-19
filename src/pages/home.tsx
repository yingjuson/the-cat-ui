import { FC, ChangeEvent, useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { getBreeds } from '../requests/catRequests';
import { CatBreed } from '../types/cat.types';
import axios from 'axios';
import CatCard from '../components/CatCard';
import Select from '../components/CatBreedSelect';
import { useCatBreedContext } from '../context/catBreedContext';
import useCatImages from '../hooks/useCatImages';

const Home: FC = () => {
  const [catBreeds, setCatBreeds] = useState<CatBreed[]>([]);
  const { selectedBreed, setSelectedBreed } = useCatBreedContext();

  const {
    catImages,
    showError,
    prefetchedImages,
    showLoadMoreButton,
    setPage,
    setShowError,
    setCatImages,
    setShowLoadMoreButton,
  } = useCatImages(selectedBreed);

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
        .catch(() => setShowError(true));
    })();
  }, []); // eslint-disable-line

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
      <Alert
        variant="danger"
        show={showError}
        dismissible
        onClose={() => setShowError(false)}
      >
        Apologies but we could not load new cats for you at this time! Miau!
      </Alert>
    </Container>
  );
};

export default Home;
