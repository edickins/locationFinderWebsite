import { ToiletActionEnum } from './types';
import toiletReducer from './toiletReducer';
import {
  IInitialToiletsState,
  IToilet
} from '../../context/toiletContext/types';

const mockToilet: IToilet = {
  id: 'toilet001',
  longName: 'toilet name',
  alphabeticalName: 'toilet name',
  openStatus: 'open',
  location: 'city centre',
  addressComponents: {
    longName: 'address longname',
    alphabeticalName: 'address name',
    types: []
  },
  formattedAddress: 'address',
  placeid: 'xxx',
  openingHours: ['openin hours'],
  nearestAlternative: 'x',
  facilities: [],
  facilityList: [],
  dateCreated: undefined,
  dateModified: undefined,
  isFavourite: false
};

const mockInitialState: IInitialToiletsState = {
  toilets: [],
  error: undefined
};

describe('toiletReducer', () => {
  it('returns default state if action.type is not recognised', () => {
    const dummyAction = { type: ToiletActionEnum.DUMMY_ACTION, payload: {} };

    expect(toiletReducer(mockInitialState, dummyAction)).toEqual(
      mockInitialState
    );
  });

  it('updates the toilets with the value from action.payload', () => {
    const mockToiletsPayload = [mockToilet];

    expect(
      toiletReducer(mockInitialState, {
        type: ToiletActionEnum.SET_TOILETS,
        payload: mockToiletsPayload
      })
    ).toEqual({ ...mockInitialState, toilets: mockToiletsPayload });
  });

  it('changes the value of isFavourite on a targeted toilet', () => {
    const mockInitialStateWithToilet = {
      toilets: [mockToilet],
      error: undefined
    };

    const newState = toiletReducer(mockInitialStateWithToilet, {
      type: ToiletActionEnum.SET_AS_FAVOURITE,
      payload: { id: `toilet001`, isFavourite: true }
    });

    expect(newState.toilets[0].isFavourite).toEqual(true);
  });

  it('sets the error if there is one returned from the api call', () => {
    const mockError = new Error('there has been an error');

    const newState = toiletReducer(mockInitialState, {
      type: ToiletActionEnum.SET_ERROR,
      payload: mockError
    });

    expect(newState.error).toEqual(mockError);
  });
});
