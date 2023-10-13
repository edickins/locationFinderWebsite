import { IToilet } from '../../context/toiletContext/types';
import { ToiletActionType, ToiletActionTypes } from './types';

export default function toiletReducer(
  state: { toilets: IToilet[]; error: any },
  action: ToiletActionTypes
) {
  const { type, payload } = action;

  switch (type) {
    case ToiletActionType.SET_TOILETS:
      return {
        ...state,
        toilets: payload
      };
    case ToiletActionType.SET_AS_FAVOURITE: {
      const updatedToilets = state.toilets.map((toilet) => {
        if (toilet.id === payload.id) {
          return { ...toilet, isFavourite: payload.isFavourite };
        }
        return toilet;
      });

      return {
        ...state,
        toilets: updatedToilets
      };
    }

    case ToiletActionType.SET_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
