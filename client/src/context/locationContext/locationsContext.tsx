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

import { ILocationsContext } from './types';
import locationReducer from '../../reducer/locationReducer/locationReducer';
import {
  LocationActionEnum,
  LocationActionType
} from '../../reducer/locationReducer/types';

// create the context defining the types of the context members
export const LocationsContext = createContext<ILocationsContext>({
  state: { locations: [], error: undefined },
  facilities: [],
  dispatchLocations: () => {}
});

export default function LocationsProvider({ children }: PropsWithChildren) {
  const [facilities, setFacilities] = useState([]);
  const [state, dispatch] = useReducer(locationReducer, {
    locations: [],
    error: undefined
  });

  // rename 'action' to make it clear which Reducer it is from.
  const dispatchLocations = (action: LocationActionType) => {
    dispatch(action);
  };

  // get location and facilities Arrays for the context provider
  useEffect(() => {
    const fetchLocations = axios.get('api/v1/locations');
    const fetchFacilities = axios.get('api/v1/facilities');

    Promise.all([fetchLocations, fetchFacilities])
      .then((responses) => {
        dispatchLocations({
          type: LocationActionEnum.SET_LOCATIONS,
          payload: responses[0].data.locations
        });
        setFacilities(responses[1].data.facilities);
      })
      .catch((error) => {
        dispatchLocations({
          type: LocationActionEnum.SET_ERROR,
          payload: error
        });
      });
  }, []);

  // create context initialValue
  const initialValue: ILocationsContext = useMemo(
    () => ({
      state,
      dispatchLocations,
      facilities
    }),
    [facilities, state]
  );

  return (
    <LocationsContext.Provider value={initialValue}>
      {children}
    </LocationsContext.Provider>
  );
}

// hook
export const useLocationsContext = () => {
  const context = useContext(LocationsContext);
  return context;
};
