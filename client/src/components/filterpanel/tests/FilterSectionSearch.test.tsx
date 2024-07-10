import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import mockLocations from './data/locations';
import FilterSectionSearch from '../FilterSectionSearch';

// vars to be overridden on a per test basis as required
let state = {
  isPanelOpen: false,
  isFacilitiesSelected: false,
  isFavouritesSelected: false,
  isSearchSelected: false,
  isSearchActive: false
};

const searchData = {
  searchTermsMatch: [],
  searchTermsPerfectMatch: [],
  searchTerm: ''
};

const mockDispatchSearchResults = vi.fn();
const mockDispatchFilters = vi.fn();
const mockUpdateSearchParams = vi.fn();

// mock filters context useFiltersContext hook
vi.mock('../../../context/filtersContext/filtersContext', () => {
  return {
    useFiltersContext: () => {
      return {
        state,
        searchData,
        dispatchFilters: mockDispatchFilters,
        dispatchSearchFilters: mockDispatchSearchResults
      };
    }
  };
});

// mock locations and facilities
vi.mock('../../../context/locationContext/locationsContext', () => {
  return {
    useLocationsContext: () => {
      return {
        state: {
          locations: mockLocations,
          error: undefined
        }
      };
    }
  };
});
