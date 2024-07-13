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

import { IFacilitiesContext, IFacility } from './types';
import locationReducer from '../../reducer/locationReducer/locationReducer';
import {
  LocationActionEnum,
  LocationActionType
} from '../../reducer/locationReducer/types';

// create the Context
const FacilitiesContext = createContext<IFacilitiesContext>({
  facilities: []
});

export default function FacilitiesProvider({ children }: PropsWithChildren) {
  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [, dispatch] = useReducer(locationReducer, {
    locations: [],
    error: undefined
  });

  // rename 'action' to make it clear which Reducer it is from.
  const dispatchLocations = (action: LocationActionType) => {
    dispatch(action);
  };

  // get location and facilities Arrays for the context provider
  useEffect(() => {
    // handle either using miragejs fake-api (/api/v1) or local mongodb server running on localhost:5001
    const instance = axios.create({
      baseURL:
        import.meta.env.DEV && import.meta.env.VITE_APP_ENV === 'LOCAL_MONGODB'
          ? 'http://localhost:5001/api/v1'
          : '/api/v1'
    });

    if (import.meta.env.PROD) {
      instance.defaults.baseURL =
        'https://locationfinder.bleepbloop.net/api/v1';
    }

    instance
      .get('/facilities')
      .then((response) => {
        setFacilities(response.data.facilities);
      })
      .catch((error) => {
        dispatchLocations({
          type: LocationActionEnum.SET_ERROR,
          payload: {
            messageTitle: error.message,
            message: 'There was an error fetching location data.'
          }
        });
      });
  }, []);

  // create context initialValue
  const initialValue: IFacilitiesContext = useMemo(
    () => ({
      facilities
    }),
    [facilities]
  );

  return (
    <FacilitiesContext.Provider value={initialValue}>
      {children}
    </FacilitiesContext.Provider>
  );
}

// hook
export const useFacilitiesContext = () => {
  const context = useContext(FacilitiesContext);
  return context;
};
