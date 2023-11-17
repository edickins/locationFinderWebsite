export enum SearchActionEnum {
  ADD_SEARCH_MATCH_IDS = 'ADD_SEARCH_MATCH_IDS',
  ADD_SEARCH_PERFECT_MATCH_IDS = 'ADD_SEARCH_PERFECT_MATCH_IDS'
}

interface AddSearchMatchIDs {
  type: SearchActionEnum.ADD_SEARCH_MATCH_IDS;
  payload: string[];
}

interface AddSearchPerfectMatchIDs {
  type: SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS;
  payload: string[];
}

export type SearchActionType = AddSearchMatchIDs | AddSearchPerfectMatchIDs;
