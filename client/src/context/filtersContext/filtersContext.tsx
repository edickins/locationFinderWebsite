import {
  PropsWithChildren,
  useReducer,
  createContext,
  useMemo,
  useContext
} from 'react';
import filtersReducer from '../../reducer/filtersReducer/filtersReducer';
import { IFiltersContext } from './types';
// import searchReducer from '../../reducer/searchReducer/searchReducer';

const FiltersContext = createContext<IFiltersContext>({
  panelsState: {
    isPanelOpen: false,
    isFacilitiesSelected: false,
    isFavouritesSelected: false,
    isSearchSelected: false
  },
  dispatchFilters: () => {}
});

export default function FiltersProvider({ children }: PropsWithChildren) {
  const [panelsState, dispatchFilters] = useReducer(filtersReducer, {
    isPanelOpen: false,
    isFacilitiesSelected: false,
    isFavouritesSelected: false,
    isSearchSelected: false,
    isSearchActive: false
  });

  // create context initialValue
  const initialValue: IFiltersContext = useMemo(
    () => ({
      panelsState,
      dispatchFilters
    }),
    [panelsState]
  );

  return (
    <FiltersContext.Provider value={initialValue}>
      {children}
    </FiltersContext.Provider>
  );
}

// hooks
export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFiltersContext must be used within a FiltersProvider');
  }
  return context;
};
