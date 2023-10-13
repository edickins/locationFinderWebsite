export enum ToiletActionType {
  SET_AS_FAVOURITE = 'SET_AS_FAVOURITE',
  SET_TOILETS = 'SET_TOILETS',
  SET_ERROR = 'SET_ERROR'
}

interface SetToiletAsFavourite {
  type: ToiletActionType.SET_AS_FAVOURITE;
  payload: any;
}

interface SetToilets {
  type: ToiletActionType.SET_TOILETS;
  payload: any;
}

interface SetError {
  type: ToiletActionType.SET_ERROR;
  payload: any;
}

export type ToiletActionTypes = SetToiletAsFavourite | SetToilets | SetError;
