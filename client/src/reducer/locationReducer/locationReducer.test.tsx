import { LocationActionEnum } from './types';
import locationReducer from './locationReducer';
import {
  IInitialLocationsState,
  ILocation
} from '../../context/locationContext/types';

const mockLocations: ILocation = {
  id: 'toilet001',
  long_name: 'location name',
  alphabetical_name: 'location name',
  open_status: 'open',
  location: 'city centre',
  address_components: [
    {
      long_name: 'address long_name',
      short_name: 'address name',
      types: []
    }
  ],
  formatted_address: 'address',
  geometry: {
    location: {
      lat: 52.0,
      lng: -0.1
    },
    location_type: 'building',
    viewport: {
      northeast: { lat: 52.0, lng: -0.1 },
      southwest: { lat: 52, lng: -0.2 }
    }
  },
  place_id: 'xxx',
  opening_hours: ['openin hours'],
  nearest_alternative: 'x',
  facilities: [],
  date_created: undefined,
  date_modified: undefined,
  isFavourite: false
};

const mockInitialState: IInitialLocationsState = {
  locations: [],
  error: undefined
};

describe('toiletReducer', () => {
  it('returns default state if action.type is not recognised', () => {
    const dummyAction = { type: LocationActionEnum.DUMMY_ACTION, payload: {} };

    expect(locationReducer(mockInitialState, dummyAction)).toEqual(
      mockInitialState
    );
  });

  it('updates the locations with the value from action.payload', () => {
    const mockLocationsPayload = [mockLocations];

    expect(
      locationReducer(mockInitialState, {
        type: LocationActionEnum.SET_LOCATIONS,
        payload: mockLocationsPayload
      })
    ).toEqual({ ...mockInitialState, locations: mockLocationsPayload });
  });

  it('changes the value of isFavourite on a targeted location', () => {
    const mockInitialStateWithToilet = {
      locations: [mockLocations],
      error: undefined
    };

    const newState = locationReducer(mockInitialStateWithToilet, {
      type: LocationActionEnum.SET_AS_FAVOURITE,
      payload: { id: `toilet001`, isFavourite: true }
    });

    expect(newState.locations[0].isFavourite).toEqual(true);
  });

  it('sets the error if there is one returned from the api call', () => {
    const mockError = new Error('there has been an error');

    const newState = locationReducer(mockInitialState, {
      type: LocationActionEnum.SET_ERROR,
      payload: mockError
    });

    expect(newState.error).toEqual(mockError);
  });
});
