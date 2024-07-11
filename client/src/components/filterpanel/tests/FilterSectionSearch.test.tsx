import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import mockLocations from './data/locations';
import FilterSectionSearch from '../FilterSectionSearch';
import { ILocation } from '../../../context/locationContext/types';

// vars to be overridden on a per test basis as required
const state = {
  isPanelOpen: false,
  isFacilitiesSelected: false,
  isFavouritesSelected: false,
  isSearchSelected: false,
  isSearchActive: false
};

const searchData = {
  searchTermsMatch: [] as ILocation[],
  searchTermsPerfectMatch: [] as ILocation[],
  searchTerm: ''
};

const mockDispatchFilters = vi.fn();
const mockUpdateSearchParams = vi.fn();

// mock filters context useFiltersContext hook
vi.mock('../../../context/filtersContext/filtersContext', () => {
  return {
    useFiltersContext: () => {
      return {
        state,
        searchData,
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
        state: {
          locations: mockLocations,
          error: undefined
        }
      };
    }
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
    state.isSearchSelected = true;
    render(<FilterSectionSearch updateSearchParams={mockUpdateSearchParams} />);

    const noResultsText = screen.getByText(
      'Please enter your search in the search field above.'
    );
    expect(noResultsText).toBeInTheDocument();
  });

  test('Initial render is correct when panel is open and there are results', () => {
    state.isSearchSelected = true;

    searchData.searchTermsMatch.push(mockLocations[0]);
    render(<FilterSectionSearch updateSearchParams={mockUpdateSearchParams} />);

    const noResultsText = screen.getByText(
      'Please enter your search in the search field above.'
    );
    expect(noResultsText).toBeInTheDocument();
  });
});
