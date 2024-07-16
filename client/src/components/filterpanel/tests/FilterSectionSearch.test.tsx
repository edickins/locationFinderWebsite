import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import mockLocations from './data/locations';
import FilterSectionSearch from '../FilterSectionSearch';

// vars to be overridden on a per test basis as required
type PanelsState = {
  isPanelOpen: boolean;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
  isSearchSelected: boolean;
  isSearchActive: boolean;
};
const mockPanelsState: PanelsState = {
  isPanelOpen: false,
  isFacilitiesSelected: false,
  isFavouritesSelected: false,
  isSearchSelected: false,
  isSearchActive: false
};

type SearchData = {
  searchTermsMatch: string[];
  searchTermsPerfectMatch: string[];
  searchTerm: string;
};

const searchData: SearchData = {
  searchTermsMatch: [],
  searchTermsPerfectMatch: [],
  searchTerm: ''
};

const mockDispatchFilters = vi.fn();
const mockUpdateSearchParams = vi.fn();

// mock filters context usePanelStateContext hook
vi.mock('../../../context/panelStateContext/panelStateContext', () => {
  return {
    usePanelStateContext: () => {
      return {
        panelsState: mockPanelsState,
        dispatchFilters: mockDispatchFilters
      };
    }
  };
});

// mock locations and facilities
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

vi.mock('../../../context/searchContext/searchContext', () => {
  return {
    useSearchContext: () => ({
      searchData
    })
  };
});

describe('FilterSectionSearch', () => {
  test('Initial render is correct', () => {
    render(<FilterSectionSearch updateSearchParams={mockUpdateSearchParams} />);

    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeInTheDocument();

    const noResultsText = screen.queryByText(
      'Please enter your search in the search field above.'
    );
    expect(noResultsText).not.toBeInTheDocument();
  });

  test('Initial render is correct when panel is open and there are no results', () => {
    mockPanelsState.isSearchSelected = true;
    render(<FilterSectionSearch updateSearchParams={mockUpdateSearchParams} />);

    const noResultsText = screen.getByText(
      'Please enter your search in the search field above.'
    );
    expect(noResultsText).toBeInTheDocument();
  });

  test('Initial render is correct when panel is open and there are results', async () => {
    mockPanelsState.isPanelOpen = true;
    mockPanelsState.isSearchSelected = true;

    const user = userEvent.setup();

    searchData.searchTermsMatch.push(mockLocations[0].id);
    searchData.searchTermsPerfectMatch.push(mockLocations[0].id);
    searchData.searchTerm = 'Location 1';
    render(<FilterSectionSearch updateSearchParams={mockUpdateSearchParams} />);

    const noResultsText = screen.queryByText(
      'Please enter your search in the search field above.'
    );
    expect(noResultsText).not.toBeInTheDocument();

    const searchTermText = screen.getByText('You searched for', {
      exact: false
    });
    expect(searchTermText).toHaveTextContent('1');

    const locationButton = screen.getByRole('button', {
      name: /location 1/i
    });

    await user.click(locationButton);

    expect(mockUpdateSearchParams).toHaveBeenCalledTimes(1);
    expect(mockUpdateSearchParams).toHaveBeenCalledWith('locationID', '1');
  });
});
