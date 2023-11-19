import {
  createContext,
  createElement,
  useState,
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

export const CatBreedContext = createContext<CatBreedContextType | null>(null);

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
