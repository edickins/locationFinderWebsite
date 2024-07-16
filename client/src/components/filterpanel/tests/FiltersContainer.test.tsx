import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import FiltersContainer from '../FiltersContainer';
import mockLocations from './data/locations';
import mockFacilities from './data/facilities';

// vars to be overridden on a per test basis as required
const initialSearchParams = new URLSearchParams();
const panelsState = {
  isPanelOpen: false,
  isFacilitiesSelected: false,
  isFavouritesSelected: false,
  isSearchSelected: false,
  isSearchActive: false
};

// mock filters context usePanelStateContext hook
vi.mock('../../../context/panelStateContext/panelStateContext', () => {
  return {
    usePanelStateContext: () => {
      return { panelsState, dispatchFilters: vi.fn() };
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

vi.mock('../../../context/facilitiesContext/facilitiesContext', () => {
  return {
    useFacilitiesContext: () => {
      return {
        facilities: mockFacilities
      };
    }
  };
});

// Spy on the setSearchParams function
const mockUpdateSearchParams = vi.fn();

describe('FiltersContainer', () => {
  test('Renders filters in the filters containers with correct initial state', () => {
    const filtersParam = initialSearchParams.get('filters');
    render(
      <MemoryRouter>
        <FiltersContainer
          filtersParam={filtersParam}
          updateSearchParams={mockUpdateSearchParams}
        />
      </MemoryRouter>
    );

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();

    const filtersButton = screen.getByRole('button', { name: /filters/i });
    expect(filtersButton).toHaveTextContent('0 active');

    const favouritesButton = screen.getByRole('button', {
      name: /favourites/i
    });
    expect(favouritesButton).toHaveTextContent('1');
  });
});
