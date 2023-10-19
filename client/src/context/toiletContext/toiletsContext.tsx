import {
  PropsWithChildren,
  createContext,
  useEffect,
  useContext,
  useReducer,
  useMemo
} from 'react';
import axios from 'axios';

import { IToiletsContext } from './types';
import toiletReducer from '../../reducer/toiletReducer/toiletReducer';
import {
  ToiletActionEnum,
  ToiletActionType
} from '../../reducer/toiletReducer/types';

// create the context defining the types of the context members
export const ToiletsContext = createContext<IToiletsContext>({
  state: { toilets: [], error: undefined },
  dispatchToilets: () => {}
});

export default function ToiletsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(toiletReducer, {
    toilets: [],
    error: undefined
  });

  // rename 'action' to make it clear which Reducer it is from.
  const dispatchToilets = (action: ToiletActionType) => {
    dispatch(action);
  };

  // fetch toilets from server
  useEffect(() => {
    const url = 'api/v1/toilets';

    async function getData() {
      try {
        const response = await axios.get(url);
        dispatchToilets({
          type: ToiletActionEnum.SET_TOILETS,
          payload: response.data.toilets
        });
      } catch (error) {
        dispatchToilets({ type: ToiletActionEnum.SET_ERROR, payload: error });
      }
    }

    getData();
  }, []);

  // create context initialValue
  const initialValue: IToiletsContext = useMemo(
    () => ({
      state,
      dispatchToilets
    }),
    [state]
  );

  return (
    <ToiletsContext.Provider value={initialValue}>
      {children}
    </ToiletsContext.Provider>
  );
}

// hook
export const useToiletsContext = () => {
  const context = useContext(ToiletsContext);
  return context;
};
