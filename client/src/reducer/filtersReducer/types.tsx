/* eslint-disable @typescript-eslint/no-explicit-any */
export enum PanelsActionEnum {
  SHOW_FILTER_PANEL = 'SHOW_FILTER_PANEL',
  HIDE_FILTER_PANEL = 'HIDE_FILTER_PANEL',
  FILTER_BUTTON_CLICK = 'FILTER_BUTTON_CLICK',
  FAVOURITES_BUTTON_CLICK = 'FAVOURITES_BUTTON_CLICK',
  SEARCH_TERM_CHANGE = 'SEARCH_TERM_CHANGE',
  SEARCH_TERM_CLICK = 'SEARCH_TERM_CLICK'
}
interface SearchTermChange {
  type: PanelsActionEnum.SEARCH_TERM_CHANGE;
}

interface SearchTermClick {
  type: PanelsActionEnum.SEARCH_TERM_CLICK;
}

interface ShowFilterPanel {
  type: PanelsActionEnum.SHOW_FILTER_PANEL;
}

interface HideFilterPanel {
  type: PanelsActionEnum.HIDE_FILTER_PANEL;
}

interface FilterButtonClick {
  type: PanelsActionEnum.FILTER_BUTTON_CLICK;
}

interface FavouritesButtonClick {
  type: PanelsActionEnum.FAVOURITES_BUTTON_CLICK;
}

export type PanelsActionType =
  | SearchTermChange
  | SearchTermClick
  | ShowFilterPanel
  | HideFilterPanel
  | FilterButtonClick
  | FavouritesButtonClick;
