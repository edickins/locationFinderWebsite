import { FiltersActionType } from '../../reducer/filtersReducer/types';

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

  dispatchFilters: React.Dispatch<FiltersActionType>;
}
