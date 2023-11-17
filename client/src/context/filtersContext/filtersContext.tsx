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
    isSearchActive: false
  },
  matchingLocationIds: { searchTerms: [], searchTermsPerfectMatch: [] },
  dispatchFilters: () => {},
  dispatchSearchResults: () => {}
});

export default function FiltersProvider({ children }: PropsWithChildren) {
  const [state, dispatchFilters] = useReducer(filtersReducer, {
    isPanelOpen: false,
    isFacilitiesSelected: false,
    isFavouritesSelected: false,
    isSearchActive: false
  });

  const [matchingLocationIds, dispatchSearchResults] = useReducer(
    searchReducer,
    { searchTerms: [], searchTermsPerfectMatch: [] }
  );

  // create context initialValue
  const initialValue: IFiltersContext = useMemo(
    () => ({
      state,
      matchingLocationIds,
      dispatchFilters,
      dispatchSearchResults
    }),
    [state, matchingLocationIds]
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
  return context;
};
