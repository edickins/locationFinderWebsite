import { describe, vi, test } from 'vitest';
import searchReducer from './searchReducer';
import { ISearchResultsInitialState } from '../../context/filtersContext/types';
import { SearchActionEnum } from './types';

const initialState: ISearchResultsInitialState = {
  searchTerms: [],
  searchTermsPerfectMatch: []
};

describe('searchReducer', () => {
  test('should update state correctly on ADD_SEARCH_MATCH_IDS', () => {
    const action = {
      type: SearchActionEnum.ADD_SEARCH_MATCH_IDS,
      payload: ['one', 'two']
    };

    const expectedState = {
      ...initialState,
      searchTerms: ['one', 'two']
    };

    const newState = searchReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test('should update state correctly on ADD_SEARCH_PERFECT_MATCH_IDS', () => {
    const action = {
      type: SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS,
      payload: ['one', 'two']
    };

    const expectedState = {
      ...initialState,
      searchTermsPerfectMatch: ['one', 'two']
    };

    const newState = searchReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
