import { useContext } from 'react';
import { CatBreedContext } from '../context/catBreedContext';

const useCatBreedContext = () => {
  const context = useContext(CatBreedContext);

  if (!context) {
    throw new Error('CatBreedContext must be initialized first');
  }

  return context;
};

export default useCatBreedContext;
