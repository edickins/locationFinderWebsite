import {
  PropsWithChildren,
  useReducer,
  createContext,
  useMemo,
  useContext
} from 'react';
import filtersReducer from '../../reducer/filtersReducer/filtersReducer';
import { IFiltersContext } from './types';
import searchReducer from '../../reducer/searchReducer/searchReducer';

const FiltersContext = createContext<IFiltersContext>({
  state: {
    isPanelOpen: false,
    isFacilitiesSelected: false,
    isFavouritesSelected: false,
    isSearchSelected: false,
    isSearchActive: false
  },
  searchData: {
    searchTermsMatch: [],
    searchTermsPerfectMatch: [],
    searchTerm: ''
  },
  dispatchFilters: () => {},
  dispatchSearchResults: () => {}
});

export default function FiltersProvider({ children }: PropsWithChildren) {
  const [state, dispatchFilters] = useReducer(filtersReducer, {
    isPanelOpen: false,
    isFacilitiesSelected: false,
    isFavouritesSelected: false,
    isSearchSelected: false,
    isSearchActive: false
  });

  const [searchData, dispatchSearchResults] = useReducer(searchReducer, {
    searchTermsMatch: [],
    searchTermsPerfectMatch: [],
    searchTerm: ''
  });

  // create context initialValue
  const initialValue: IFiltersContext = useMemo(
    () => ({
      state,
      searchData,
      dispatchFilters,
      dispatchSearchResults
    }),
    [state, searchData]
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
