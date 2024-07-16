import { PanelsActionType } from '../../reducer/filtersReducer/types';

export type IPanelsInitialState = {
  isPanelOpen: boolean;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
  isSearchSelected: boolean;
};

export interface IPanelStateContext {
  panelsState: {
    isPanelOpen: boolean;
    isFacilitiesSelected: boolean;
    isFavouritesSelected: boolean;
    isSearchSelected: boolean;
  };

  dispatchFilters: React.Dispatch<PanelsActionType>;
}
