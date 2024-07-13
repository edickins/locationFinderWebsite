import { useState } from 'react';
import { screen, render } from '@testing-library/react';

import { vi } from 'vitest';
import FilterPanel from '../FilterPanel';
import mockFacilities from './data/facilities';
import mockLocations from './data/locations';

const mockHandleFindNearestLocationClick = vi.fn();
const mockSearchParams = new URLSearchParams();

// vars to be overridden on a per test basis as required
type State = {
  isPanelOpen: boolean;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
  isSearchSelected: boolean;
  isSearchActive: boolean;
};
const state: State = {
  isPanelOpen: false,
  isFacilitiesSelected: false,
  isFavouritesSelected: false,
  isSearchSelected: false,
  isSearchActive: false
};

type SearchData = {
  searchTermsMatch: [];
  searchTermsPerfectMatch: [];
  searchTerm: string;
};

const searchData = {
  searchTermsMatch: [],
  searchTermsPerfectMatch: [],
  searchTerm: ''
};

vi.mock('../../../context/locationContext/locationsContext', () => {
  return {
    useLocationsContext: () => {
      return {
        facilities: mockFacilities,
        state: {
          locations: mockLocations,
          error: undefined
        }
      };
    }
  };
});

vi.mock('../../../context/filtersContext/filtersContext', () => ({
  useFiltersContext: () => ({
    state,
    searchData,
    dispatchFilters: vi.fn(),
    dispatchSearchResults: vi.fn()
  })
}));

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as any;

  return {
    ...actual,
    useSearchParams: () => {
      const [searchParams, setSearchParams] = useState(mockSearchParams);
      return [searchParams, setSearchParams];
    }
  };
});

describe('FilterPanel - a test suite with params stored in state to test multiple clicks', () => {
  test('Initial render is correct', () => {
    render(
      <FilterPanel
        handleFindLocationButtonClick={mockHandleFindNearestLocationClick}
      />
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    const filtersButton = screen.getByRole('button', { name: /filters/i });
    expect(filtersButton).toBeInTheDocument();
    expect(filtersButton).toHaveTextContent('0 active');

    const favouritesButton = screen.getByTestId('main-favourites-button');
    expect(favouritesButton).toBeInTheDocument();
  });

  test('Facilities are shown when the facilities are selected', async () => {
    state.isFacilitiesSelected = true;
    render(
      <FilterPanel
        handleFindLocationButtonClick={mockHandleFindNearestLocationClick}
      />
    );

    const facilitiesButtons = screen.getAllByRole('listitem');
    expect(facilitiesButtons).toHaveLength(3);
  });
});
