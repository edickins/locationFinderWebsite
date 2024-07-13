import {
  PropsWithChildren,
  useReducer,
  createContext,
  useMemo,
  useContext
} from 'react';

import searchReducer from '../../reducer/searchReducer/searchReducer';
import { ISearchDataContext } from './types';

const SearchContext = createContext<ISearchDataContext>({
  searchData: {
    searchTermsMatch: [],
    searchTermsPerfectMatch: [],
    searchTerm: ''
  },
  dispatchSearchResults: () => {}
});

export default function SearchResultsProvider({ children }: PropsWithChildren) {
  const [searchData, dispatchSearchResults] = useReducer(searchReducer, {
    searchTermsMatch: [],
    searchTermsPerfectMatch: [],
    searchTerm: ''
  });

  const initialValue: ISearchDataContext = useMemo(
    () => ({
      searchData,
      dispatchSearchResults
    }),
    [searchData]
  );

  return (
    <SearchContext.Provider value={initialValue}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error(
      'useSearchContext must be used within a SearchResultsProvider'
    );
  }
  return context;
};
