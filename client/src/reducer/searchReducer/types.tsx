export enum SearchActionEnum {
  ADD_SEARCH_MATCH_IDS = 'ADD_SEARCH_MATCH_IDS',
  ADD_SEARCH_PERFECT_MATCH_IDS = 'ADD_SEARCH_PERFECT_MATCH_IDS',
  SET_SEARCH_TERM = 'SET_SEARCH_TERM'
}

export interface AddSearchMatchIDs {
  type: SearchActionEnum.ADD_SEARCH_MATCH_IDS;
  payload: string[];
}

export interface AddSearchPerfectMatchIDs {
  type: SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS;
  payload: string[];
}

export interface SetSearchTerm {
  type: SearchActionEnum.SET_SEARCH_TERM;
  payload: string;
}

export type SearchActionType =
  | AddSearchMatchIDs
  | AddSearchPerfectMatchIDs
  | SetSearchTerm;
