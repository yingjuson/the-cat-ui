import { FC, ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { CatBreed } from '../types/cat.types';
import useCatBreedContext from '../hooks/useCatBreedContext';

interface Props {
  catBreeds: CatBreed[];
  onChangeFn: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const CatBreedSelect: FC<Props> = ({ catBreeds, onChangeFn }) => {
  const { selectedBreed } = useCatBreedContext();

  return (
    <div className="breed-select">
      <Form.Label className="breed-select__label">Select Breed</Form.Label>
      <Form.Select
        aria-label="select breed"
        size="lg"
        value={selectedBreed}
        className="breed-select__form-select"
        onChange={onChangeFn}
      >
        <option value="">-- nothing selected --</option>
        {catBreeds.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default CatBreedSelect;
