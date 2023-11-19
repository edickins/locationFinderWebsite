import { FiltersActionEnum, FiltersActionType } from './types';
import { IFiltersInitialState } from '../../context/filtersContext/types';

export default function filtersReducer(
  state: IFiltersInitialState,
  action: FiltersActionType
) {
  const { type } = action;
  // let payload;
  // if ('payload' in action) {
  //   payload = action.payload;
  // }

  switch (type) {
    case FiltersActionEnum.SHOW_FILTER_PANEL:
      return {
        ...state,
        isPanelOpen: true
      };
    case FiltersActionEnum.HIDE_FILTER_PANEL:
      return {
        ...state,
        isPanelOpen: false,
        isFacilitiesSelected: false,
        isFavouritesSelected: false,
        isSearchActive: false
      };
    case FiltersActionEnum.FILTER_BUTTON_CLICK:
      return {
        ...state,
        isPanelOpen: true,
        isFacilitiesSelected: true,
        isFavouritesSelected: false,
        isSearchActive: false
      };
    case FiltersActionEnum.FAVOURITES_BUTTON_CLICK:
      return {
        ...state,
        isPanelOpen: true,
        isFacilitiesSelected: false,
        isFavouritesSelected: true,
        isSearchActive: false
      };
    case FiltersActionEnum.SEARCH_TERM_CHANGE: {
      return {
        ...state,
        isPanelOpen: true,
        isFacilitiesSelected: false,
        isFavouritesSelected: false,
        isSearchActive: true
      };
    }
    default:
      return state;
  }
}
