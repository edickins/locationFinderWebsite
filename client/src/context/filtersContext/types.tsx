import { FiltersActionType } from '../../reducer/filtersReducer/types';
import { SearchActionType } from '../../reducer/searchReducer/types';

export type IFiltersInitialState = {
  isPanelOpen: boolean;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
  isSearchSelected: boolean;
  isSearchActive: boolean;
};

export interface IFiltersContext {
  state: {
    isPanelOpen: boolean;
    isFacilitiesSelected: boolean;
    isFavouritesSelected: boolean;
    isSearchSelected: boolean;
    isSearchActive: boolean;
  };
  searchData: {
    searchTermsMatch: string[];
    searchTermsPerfectMatch: string[];
    searchTerm: string;
  };
  dispatchFilters: React.Dispatch<FiltersActionType>;
  dispatchSearchResults: React.Dispatch<SearchActionType>;
}

export interface ISearchResultsInitialState {
  searchTermsMatch: string[];
  searchTermsPerfectMatch: string[];
  searchTerm: string;
}
