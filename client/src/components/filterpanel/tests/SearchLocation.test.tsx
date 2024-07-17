import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import SearchLocation from '../SearchLocation';
import { PanelsActionEnum } from '../../../reducer/filtersReducer/types';
import mockLocations from './data/locations';
import { SearchActionEnum } from '../../../reducer/searchReducer/types';

// Create a mock for the action function
const mockDispatchFilters = vi.fn();
const mockDispatchSearchResults = vi.fn();

const mockPanelState = {
  isPanelOpen: false,
  isFacilitiesSelected: false,
  isFavouritesSelected: false,
  isSearchSelected: false,
  isSearchActive: false
};

const mockSearchData = {
  searchTermsMatch: [],
  searchTermsPerfectMatch: [],
  searchTerm: ''
};

// Mock the usePanelState hook
vi.mock('../../../context/panelStateContext/panelStateContext', () => {
  return {
    usePanelStateContext: () => ({
      panelsState: mockPanelState,
      dispatchFilters: mockDispatchFilters
    })
  };
});

// Mock the useSearchContext hook
vi.mock('../../../context/searchContext/searchContext', () => {
  return {
    useSearchContext: () => {
      return {
        searchData: mockSearchData,
        dispatchSearchResults: mockDispatchSearchResults
      };
    }
  };
});

// Mock the useLocations hook
vi.mock('../../../context/locationContext/locationsContext', () => {
  return {
    useLocationsContext: () => {
      return {
        locationsState: {
          locations: mockLocations,
          error: undefined
        }
      };
    }
  };
});

describe('SearchLocation', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    mockLocations[0].long_name = 'Location001';
  });

  test('Focussing the text input triggers filter action', async () => {
    // render the search component
    render(<SearchLocation />);
    const user = userEvent.setup();

    // search field responds correctly to being focussed
    const searchInput = screen.getByRole('textbox', { name: /search/i });

    // typing a single letter dispatches the correct events with the correct payload
    await user.click(searchInput);
    expect(mockDispatchFilters).toHaveBeenCalledTimes(1);
    expect(mockDispatchFilters).toHaveBeenCalledWith({
      type: PanelsActionEnum.SEARCH_TERM_CHANGE
    });
  });

  test('Typing in matching text input triggers dispatchSearchResults actions with all locations as results', async () => {
    // render the search component
    render(<SearchLocation />);
    const user = userEvent.setup();

    // search field responds correctly to being focussed
    const searchInput = screen.getByRole('textbox', { name: /search/i });

    // typing a single letter dispatches the correct events with the correct payload
    await user.type(searchInput, 'L');

    expect(mockDispatchSearchResults).toHaveBeenCalledTimes(5);
    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.SET_SEARCH_TERM,
      payload: 'L'
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_MATCH_IDS,
      payload: ['1', '2', '3']
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS,
      payload: []
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_MATCH_IDS,
      payload: ['1', '2', '3']
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS,
      payload: []
    });
  });

  test('Typing in an exact matching text input triggers dispatchSearchResults actions with single location as results', async () => {
    mockLocations[0].long_name = 'Z';
    const user = userEvent.setup();

    // render the search component
    render(<SearchLocation />);

    // search field responds correctly to being focussed
    const searchInput = screen.getByRole('textbox', { name: /search/i });

    // typing a single letter dispatches the correct events with the correct payload
    await user.type(searchInput, 'Z');

    expect(mockDispatchSearchResults).toHaveBeenCalledTimes(5);
    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.SET_SEARCH_TERM,
      payload: 'Z'
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_MATCH_IDS,
      payload: ['1']
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS,
      payload: ['1']
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_MATCH_IDS,
      payload: ['1']
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS,
      payload: ['1']
    });
  });
  test('Typing in a non-matching text input triggers dispatchSearchResults actions with no location as result', async () => {
    const user = userEvent.setup();

    // render the search component
    render(<SearchLocation />);

    // search field responds correctly to being focussed
    const searchInput = screen.getByRole('textbox', { name: /search/i });

    // typing a single letter dispatches the correct events with the correct payload
    await user.type(searchInput, 'P');

    expect(mockDispatchSearchResults).toHaveBeenCalledTimes(5);
    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.SET_SEARCH_TERM,
      payload: 'P'
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_MATCH_IDS,
      payload: []
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS,
      payload: []
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_MATCH_IDS,
      payload: []
    });

    expect(mockDispatchSearchResults).toHaveBeenCalledWith({
      type: SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS,
      payload: []
    });
  });
});
