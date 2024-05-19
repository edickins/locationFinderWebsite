import { describe, test } from 'vitest';
import searchReducer from './searchReducer';
import { ISearchResultsInitialState } from '../../context/filtersContext/types';
import {
  AddSearchMatchIDs,
  AddSearchPerfectMatchIDs,
  SearchActionEnum,
  SetSearchTerm
} from './types';

const initialState: ISearchResultsInitialState = {
  searchTermsMatch: [],
  searchTermsPerfectMatch: [],
  searchTerm: ''
};

describe('searchReducer', () => {
  test('should update state correctly on ADD_SEARCH_MATCH_IDS', () => {
    const action: AddSearchMatchIDs = {
      type: SearchActionEnum.ADD_SEARCH_MATCH_IDS,
      payload: ['one', 'two']
    };

    const expectedState = {
      ...initialState,
      searchTermsMatch: ['one', 'two']
    };

    const newState = searchReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test('should update state correctly on ADD_SEARCH_PERFECT_MATCH_IDS', () => {
    const action: AddSearchPerfectMatchIDs = {
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

  test('should add the user generated search term to the reducer state', () => {
    const action: SetSearchTerm = {
      type: SearchActionEnum.SET_SEARCH_TERM,
      payload: 'foo'
    };

    const expectedState = {
      ...initialState,
      searchTerm: 'foo'
    };

    const newState = searchReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
