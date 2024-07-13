import { FiltersActionType } from '../../reducer/filtersReducer/types';

export type IFiltersInitialState = {
  isPanelOpen: boolean;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
  isSearchSelected: boolean;
};

export interface IFiltersContext {
  panelsState: {
    isPanelOpen: boolean;
    isFacilitiesSelected: boolean;
    isFavouritesSelected: boolean;
    isSearchSelected: boolean;
  };

  dispatchFilters: React.Dispatch<FiltersActionType>;
}
