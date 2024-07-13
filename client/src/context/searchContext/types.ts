import { SearchActionType } from '../../reducer/searchReducer/types';

export interface ISearchResultsInitialState {
  searchTermsMatch: string[];
  searchTermsPerfectMatch: string[];
  searchTerm: string;
}

export interface ISearchDataContext {
  searchData: {
    searchTermsMatch: string[];
    searchTermsPerfectMatch: string[];
    searchTerm: string;
  };
  dispatchSearchResults: React.Dispatch<SearchActionType>;
}
