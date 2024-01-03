import { ILocation } from '../../context/locationContext/types';
import { LocationActionEnum, LocationActionType } from './types';

export default function locationReducer(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: {
    locations: ILocation[];
    error: { message: string; messageTitle: string } | undefined;
  },
  action: LocationActionType
) {
  const { type, payload } = action;

  switch (type) {
    case LocationActionEnum.SET_LOCATIONS:
      return {
        ...state,
        locations: payload,
        error: undefined
      };
    case LocationActionEnum.SET_AS_FAVOURITE: {
      const updatedLocations = state.locations.map((location) => {
        if (location.id === payload.id) {
          return { ...location, isFavourite: payload.isFavourite };
        }
        return location;
      });

      return {
        ...state,
        locations: updatedLocations
      };
    }

    case LocationActionEnum.SET_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
