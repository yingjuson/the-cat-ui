import { FC, ChangeEvent, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { getBreeds } from '../services/catBreedService';
import axios from 'axios';

interface CatBreed {
  id: string;
  name: string;
  image: string;
  origin: string;
  description: string;
  temperament: string;
}

const Home: FC = () => {
  const [catBreeds, setCatBreeds] = useState<CatBreed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');

  useEffect(() => {
    (() => {
      axios(getBreeds())
        .then(({ data }) => setCatBreeds(data))
        .catch((error) => console.log({ error }));
    })();
  }, []);

  console.log({ catBreeds });
  return (
    <Container className="mt-2">
      <h1>Cat Browser</h1>
      <Form>
        <Form.Group controlId="form-cat-breed">
          <Form.Label>Breed</Form.Label>
          <Form.Select
            aria-label="select breed"
            size="lg"
            value={selectedBreed}
            disabled={false}
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
    </Container>
  );
};

export default Home;
