import { IToilet } from '../../context/toiletContext/types';
import { ToiletActionEnum, ToiletActionType } from './types';

export default function toiletReducer(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: { toilets: IToilet[]; error: any },
  action: ToiletActionType
) {
  const { type, payload } = action;

  switch (type) {
    case ToiletActionEnum.SET_TOILETS:
      return {
        ...state,
        toilets: payload
      };
    case ToiletActionEnum.SET_AS_FAVOURITE: {
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

    case ToiletActionEnum.SET_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
