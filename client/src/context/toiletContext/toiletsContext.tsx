import {
  PropsWithChildren,
  createContext,
  useEffect,
  useContext,
  useReducer,
  useMemo,
  useState
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
  facilities: [],
  dispatchToilets: () => {}
});

export default function ToiletsProvider({ children }: PropsWithChildren) {
  const [facilities, setFacilities] = useState([]);
  const [state, dispatch] = useReducer(toiletReducer, {
    toilets: [],
    error: undefined
  });

  // rename 'action' to make it clear which Reducer it is from.
  const dispatchToilets = (action: ToiletActionType) => {
    dispatch(action);
  };

  // get toilet and facilities Arrays for the context provider
  useEffect(() => {
    const fetchToilets = axios.get('api/v1/toilets');
    const fetchFacilities = axios.get('api/v1/facilities');

    Promise.all([fetchToilets, fetchFacilities])
      .then((responses) => {
        dispatchToilets({
          type: ToiletActionEnum.SET_TOILETS,
          payload: responses[0].data.toilets
        });
        setFacilities(responses[1].data.facilities);
      })
      .catch((error) => {
        dispatchToilets({ type: ToiletActionEnum.SET_ERROR, payload: error });
      });
  }, []);

  // create context initialValue
  const initialValue: IToiletsContext = useMemo(
    () => ({
      state,
      dispatchToilets,
      facilities
    }),
    [facilities, state]
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
