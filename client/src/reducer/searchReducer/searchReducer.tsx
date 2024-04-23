import { ISearchResultsInitialState } from '../../context/filtersContext/types';
import { SearchActionType, SearchActionEnum } from './types';

export default function searchReducer(
  state: ISearchResultsInitialState,
  action: SearchActionType
) {
  const { type, payload } = action;

  switch (type) {
    case SearchActionEnum.ADD_SEARCH_MATCH_IDS:
      return {
        ...state,
        searchTermsMatch: [...payload]
      };
    case SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS:
      return {
        ...state,
        searchTermsPerfectMatch: [...payload]
      };
    case SearchActionEnum.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: payload
      };
    default:
      return state;
  }
}
