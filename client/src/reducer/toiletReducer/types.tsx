export enum ToiletActionEnum {
  SET_AS_FAVOURITE = 'SET_AS_FAVOURITE',
  SET_TOILETS = 'SET_TOILETS',
  SET_ERROR = 'SET_ERROR',
  DUMMY_ACTION = 'DUMMY_ACTION'
}

interface SetToiletAsFavourite {
  type: ToiletActionEnum.SET_AS_FAVOURITE;
  payload: any;
}

interface SetToilets {
  type: ToiletActionEnum.SET_TOILETS;
  payload: any;
}

interface SetError {
  type: ToiletActionEnum.SET_ERROR;
  payload: any;
}

interface DummyAction {
  type: ToiletActionEnum.DUMMY_ACTION;
  payload: any;
}

export type ToiletActionType =
  | SetToiletAsFavourite
  | SetToilets
  | SetError
  | DummyAction;
