/* eslint-disable @typescript-eslint/no-explicit-any */
export enum LocationActionEnum {
  SET_AS_FAVOURITE = 'SET_AS_FAVOURITE',
  SET_LOCATIONS = 'SET_LOCATIONS',
  SET_ERROR = 'SET_ERROR',
  DUMMY_ACTION = 'DUMMY_ACTION'
}

interface SetLocationAsFavourite {
  type: LocationActionEnum.SET_AS_FAVOURITE;
  payload: any;
}

interface SetLocations {
  type: LocationActionEnum.SET_LOCATIONS;
  payload: any;
}

interface SetError {
  type: LocationActionEnum.SET_ERROR;
  payload: any;
}

interface DummyAction {
  type: LocationActionEnum.DUMMY_ACTION;
  payload: any;
}

export type LocationActionType =
  | SetLocationAsFavourite
  | SetLocations
  | SetError
  | DummyAction;
