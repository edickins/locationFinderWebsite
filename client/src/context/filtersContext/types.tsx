import { FiltersActionType } from '../../reducer/filtersReducer/types';
import { SearchActionType } from '../../reducer/searchReducer/types';

export type IFiltersInitialState = {
  isPanelOpen: boolean;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
  isSearchActive: boolean;
};

export interface IFiltersContext {
  state: {
    isPanelOpen: boolean;
    isFacilitiesSelected: boolean;
    isFavouritesSelected: boolean;
    isSearchActive: boolean;
  };
  matchingLocationIds: {
    searchTerms: string[];
    searchTermsPerfectMatch: string[];
  };
  dispatchFilters: React.Dispatch<FiltersActionType>;
  dispatchSearchResults: React.Dispatch<SearchActionType>;
}

export interface ISearchResultsInitialState {
  searchTerms: string[];
  searchTermsPerfectMatch: string[];
}
