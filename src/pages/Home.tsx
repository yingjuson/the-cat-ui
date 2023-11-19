import { FC, ChangeEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { getBreeds } from '../requests/catRequests';
import { CatBreed } from '../types/cat.types';
import axios from 'axios';
import CatCard from '../components/CatCard';
import Select from '../components/CatBreedSelect';
import useCatImages from '../hooks/useCatImages';
import { DEFAULT_GET_ERROR_MESSAGE } from '../constants/notification.constants';
import useNotificationContext from '../hooks/useNotificationContext';
import useCatBreedContext from '../hooks/useCatBreedContext';

const Home: FC = () => {
  const [catBreeds, setCatBreeds] = useState<CatBreed[]>([]);
  const { selectedBreed, setSelectedBreed } = useCatBreedContext();
  const { fireNotification } = useNotificationContext();

  const {
    catImages,
    prefetchedImages,
    showLoadMoreButton,
    setPage,
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
        .catch(() => {
          fireNotification({
            message: DEFAULT_GET_ERROR_MESSAGE,
            type: 'danger',
          });
        });
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
    </Container>
  );
};

export default Home;
