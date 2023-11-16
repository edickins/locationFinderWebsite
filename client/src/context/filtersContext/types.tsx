import { FiltersActionType } from '../../reducer/filtersReducer/types';

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
  dispatchFilters: React.Dispatch<FiltersActionType>;
}
