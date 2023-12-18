import { describe, test } from 'vitest';
import filtersReducer from './filtersReducer';
import { FiltersActionType, FiltersActionEnum } from './types';
import { IFiltersInitialState } from '../../context/filtersContext/types';

const initialState: IFiltersInitialState = {
  isPanelOpen: false,
  isFacilitiesSelected: false,
  isFavouritesSelected: false,
  isSearchActive: false,
  isSearchSelected: false
};

describe('filtersReducer', () => {
  test('should handle SHOW_FILTER_PANEL action', () => {
    const action: FiltersActionType = {
      type: FiltersActionEnum.SHOW_FILTER_PANEL
    };
    const expectedState: IFiltersInitialState = {
      ...initialState,
      isPanelOpen: true
    };
    const newState = filtersReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('should handle HIDE_FILTER_PANEL action', () => {
    const action: FiltersActionType = {
      type: FiltersActionEnum.HIDE_FILTER_PANEL
    };
    const expectedState: IFiltersInitialState = {
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
    const action: FiltersActionType = {
      type: FiltersActionEnum.FILTER_BUTTON_CLICK
    };
    const expectedState: IFiltersInitialState = {
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
    const action: FiltersActionType = {
      type: FiltersActionEnum.FAVOURITES_BUTTON_CLICK
    };
    const expectedState: IFiltersInitialState = {
      ...initialState,
      isPanelOpen: true,
      isFacilitiesSelected: false,
      isFavouritesSelected: true,
      isSearchActive: false
    };

    const newState = filtersReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('should handle SEARCH_TERM_CHANGE', () => {
    const action: FiltersActionType = {
      type: FiltersActionEnum.SEARCH_TERM_CHANGE
    };

    const expectedState: IFiltersInitialState = {
      ...initialState,
      isPanelOpen: true,
      isFacilitiesSelected: false,
      isFavouritesSelected: false,
      isSearchActive: true
    };

    const newState = filtersReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
