import {
  createContext,
  createElement,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface Props {
  children: React.ReactNode;
}

interface CatBreedContextType {
  selectedBreed: string;
  setSelectedBreed: Dispatch<SetStateAction<string>>;
}

const CatBreedContext = createContext<CatBreedContextType | null>(null);

export const CatBreedContextProvider = ({ children }: Props) => {
  const [selectedBreed, setSelectedBreed] = useState<string>('');

  return createElement(
    CatBreedContext.Provider,
    {
      value: {
        selectedBreed,
        setSelectedBreed,
      },
    },
    children
  );
};

export const useCatBreedContext = () => {
  const context = useContext(CatBreedContext);

  if (!context) {
    throw new Error('CatBreedContext must be initialized first');
  }

  return context;
};
