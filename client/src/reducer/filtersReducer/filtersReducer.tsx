import { PanelsActionEnum, PanelsActionType } from './types';
import { IPanelsInitialState } from '../../context/panelStateContext/types';

export default function filtersReducer(
  state: IPanelsInitialState,
  action: PanelsActionType
) {
  const { type } = action;
  switch (type) {
    case PanelsActionEnum.SHOW_FILTER_PANEL:
      return {
        ...state,
        isPanelOpen: true
      };
    case PanelsActionEnum.HIDE_FILTER_PANEL:
      return {
        ...state,
        isPanelOpen: false,
        isFacilitiesSelected: false,
        isFavouritesSelected: false,
        isSearchSelected: false
      };
    case PanelsActionEnum.FILTER_BUTTON_CLICK:
      return {
        ...state,
        isPanelOpen: true,
        isFacilitiesSelected: !state.isFacilitiesSelected,
        isFavouritesSelected: false,
        isSearchSelected: false
      };
    case PanelsActionEnum.FAVOURITES_BUTTON_CLICK:
      return {
        ...state,
        isPanelOpen: true,
        isFacilitiesSelected: false,
        isFavouritesSelected: !state.isFavouritesSelected,
        isSearchSelected: false
      };
    case PanelsActionEnum.SEARCH_TERM_CHANGE: {
      return {
        ...state,
        isPanelOpen: true,
        isFacilitiesSelected: false,
        isFavouritesSelected: false,
        isSearchSelected: true
      };
    }
    case PanelsActionEnum.SEARCH_TERM_CLICK: {
      return {
        ...state,
        isPanelOpen: true,
        isFacilitiesSelected: false,
        isFavouritesSelected: false,
        isSearchSelected: !state.isSearchSelected
      };
    }
    default:
      return state;
  }
}
