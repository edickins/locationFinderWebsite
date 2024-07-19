import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import mockLocations from './data/locations';
import SearchResultsList from '../SearchResultsList';

type PanelsState = {
  isPanelOpen: boolean;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
  isSearchSelected: boolean;
};
let mockPanelState: PanelsState = {
  isPanelOpen: false,
  isFacilitiesSelected: false,
  isFavouritesSelected: false,
  isSearchSelected: false
};

type SearchData = {
  searchTermsMatch: string[];
  searchTermsPerfectMatch: string[];
  searchTerm: string;
};

let mockSearchData: SearchData = {
  searchTermsMatch: [],
  searchTermsPerfectMatch: [],
  searchTerm: ''
};

const mockDispatchFilters = vi.fn();
const mockDispatchSearchResults = vi.fn();
const mockUpdateSearchParams = vi.fn();
const mockDispatchLocations = vi.fn();

vi.mock('../../../context/locationContext/locationsContext', () => {
  return {
    useLocationsContext: () => {
      return {
        locationsState: {
          locations: mockLocations,
          error: undefined
        },
        dispatchLocations: mockDispatchLocations
      };
    }
  };
});

vi.mock('../../../context/panelStateContext/panelStateContext', () => {
  return {
    usePanelStateContext: () => ({
      panelsState: mockPanelState,
      dispatchFilters: mockDispatchFilters
    })
  };
});

vi.mock('../../../context/searchContext/searchContext', () => {
  return {
    useSearchContext: () => ({
      searchData: mockSearchData,
      dispatchSearchResults: mockDispatchSearchResults
    })
  };
});

describe('SearchResultsList', () => {
  afterEach(() => {
    mockDispatchFilters.mockReset();
    mockDispatchLocations.mockReset();
    mockDispatchSearchResults.mockReset();

    mockPanelState = {
      isPanelOpen: false,
      isFacilitiesSelected: false,
      isFavouritesSelected: false,
      isSearchSelected: false
    };

    mockSearchData = {
      searchTermsMatch: [],
      searchTermsPerfectMatch: [],
      searchTerm: ''
    };
  });

  test('Renders correctly on initial state when panel is closed', () => {
    render(<SearchResultsList updateSearchParams={mockUpdateSearchParams} />);

    const noResultsText = screen.getByText(
      'Please enter your search in the search field above.',
      {
        exact: false
      }
    );
    expect(noResultsText).toBeInTheDocument();
  });
  test('Displays correct message when panel is opened and there are no results for a term', () => {
    mockSearchData.searchTerm = 'Frangipani';

    render(<SearchResultsList updateSearchParams={mockUpdateSearchParams} />);

    const searchText = screen.getByText(`You searched for "Frangipani"`, {
      exact: false
    });
    expect(searchText).toBeInTheDocument();

    const noResultsText = screen.getByText('No search results found.');
    expect(noResultsText).toBeInTheDocument();
  });

  test('Displays a list item button for single exact match', () => {
    mockSearchData.searchTermsMatch = ['1'];
    render(<SearchResultsList updateSearchParams={mockUpdateSearchParams} />);
    const resultItem = screen.getByRole('button', { name: /location 1/i });
    expect(resultItem).toBeInTheDocument();
  });

  test('Calls updateSearchParams correctly when a search result is clicked', async () => {
    const user = userEvent.setup();
    mockSearchData.searchTermsMatch = ['1'];
    render(<SearchResultsList updateSearchParams={mockUpdateSearchParams} />);
    const resultItem = screen.getByRole('button', { name: /location 1/i });

    await user.click(resultItem);
    expect(mockUpdateSearchParams).toHaveBeenCalledTimes(1);
    expect(mockUpdateSearchParams).toHaveBeenCalledWith('locationID', '1');
  });
});
