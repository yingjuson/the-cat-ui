import { FC, ChangeEvent, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { getBreeds, getCatImage } from '../services/catBreedService';
import axios from 'axios';
import { CatBreed, CatImage } from '../types/cat.types';
import CatCard from '../components/CatCard';

const Home: FC = () => {
  const [catBreeds, setCatBreeds] = useState<CatBreed[]>([]);
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');

  useEffect(() => {
    (() => {
      axios(getBreeds())
        .then(({ data }) => setCatBreeds(data))
        .catch((error) => console.log({ error }));
    })();
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      axios(getCatImage({ id: selectedBreed, limit: 20, page: 1 }))
        .then(({ data }) => setCatImages(data))
        .catch((error) => console.log({ error }));
    }
  }, [selectedBreed]);

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
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSelectedBreed(e.target.value)
            }
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
    </Container>
  );
};

export default Home;
