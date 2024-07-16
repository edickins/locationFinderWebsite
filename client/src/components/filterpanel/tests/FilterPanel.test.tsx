import { useState } from 'react';
import { screen, render } from '@testing-library/react';

import { vi } from 'vitest';
import FilterPanel from '../FilterPanel';
import mockFacilities from './data/facilities';
import mockLocations from './data/locations';

const mockHandleFindNearestLocationClick = vi.fn();
const mockSearchParams = new URLSearchParams();

// vars to be overridden on a per test basis as required
type PanelsState = {
  isPanelOpen: boolean;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
  isSearchSelected: boolean;
  isSearchActive: boolean;
};
const panelsState: PanelsState = {
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

const searchData: SearchData = {
  searchTermsMatch: [],
  searchTermsPerfectMatch: [],
  searchTerm: ''
};

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

vi.mock('../../../context/facilitiesContext/facilitiesContext', () => {
  return {
    useFacilitiesContext: () => {
      return {
        facilities: mockFacilities
      };
    }
  };
});

vi.mock('../../../context/panelStateContext/panelStateContext', () => ({
  usePanelStateContext: () => ({
    panelsState,
    dispatchFilters: vi.fn()
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
    panelsState.isFacilitiesSelected = true;
    render(
      <FilterPanel
        handleFindLocationButtonClick={mockHandleFindNearestLocationClick}
      />
    );

    const facilitiesButtons = screen.getAllByRole('listitem');
    expect(facilitiesButtons).toHaveLength(3);
  });
});
