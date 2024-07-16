import { describe, test } from 'vitest';
import filtersReducer from './filtersReducer';
import { PanelsActionType, PanelsActionEnum } from './types';
import { IPanelsInitialState } from '../../context/panelStateContext/types';

const initialState: IPanelsInitialState = {
  isPanelOpen: false,
  isFacilitiesSelected: false,
  isFavouritesSelected: false,
  isSearchActive: false,
  isSearchSelected: false
};

describe('filtersReducer', () => {
  test('should handle SHOW_FILTER_PANEL action', () => {
    const action: PanelsActionType = {
      type: PanelsActionEnum.SHOW_FILTER_PANEL
    };
    const expectedState: IPanelsInitialState = {
      ...initialState,
      isPanelOpen: true
    };
    const newState = filtersReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('should handle HIDE_FILTER_PANEL action', () => {
    const action: PanelsActionType = {
      type: PanelsActionEnum.HIDE_FILTER_PANEL
    };
    const expectedState: IPanelsInitialState = {
      ...initialState,
      isPanelOpen: false
    };
    const newState = filtersReducer(
      { ...initialState, isPanelOpen: true },
      action
    );
    expect(newState).toEqual(expectedState);
  });

  test('should handle FILTER_BUTTON_CLICK', () => {
    const action: PanelsActionType = {
      type: PanelsActionEnum.FILTER_BUTTON_CLICK
    };
    const expectedState: IPanelsInitialState = {
      ...initialState,
      isPanelOpen: true,
      isFacilitiesSelected: true,
      isFavouritesSelected: false,
      isSearchActive: false
    };

    const newState = filtersReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('should handle FAVOURITES_BUTTON_CLICK', () => {
    const action: PanelsActionType = {
      type: PanelsActionEnum.FAVOURITES_BUTTON_CLICK
    };
    const expectedState: IPanelsInitialState = {
      ...initialState,
      isPanelOpen: true,
      isFacilitiesSelected: false,
      isFavouritesSelected: true,
      isSearchActive: false,
      isSearchSelected: false
    };

    const newState = filtersReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('should handle SEARCH_TERM_CHANGE', () => {
    const action: PanelsActionType = {
      type: PanelsActionEnum.SEARCH_TERM_CHANGE
    };

    const expectedState: IPanelsInitialState = {
      ...initialState,
      isPanelOpen: true,
      isFacilitiesSelected: false,
      isFavouritesSelected: false,
      isSearchActive: true,
      isSearchSelected: true
    };

    const newState = filtersReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
