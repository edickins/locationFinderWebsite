import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import mockLocations from './data/locations';
import FilterSectionFavourites from '../FilterSectionFavourites';

// vars to be overridden on a per test basis as required
let mockFiltersState = {
  isPanelOpen: false,
  isFacilitiesSelected: false,
  isFavouritesSelected: false,
  isSearchSelected: false,
  isSearchActive: false
};

const mockDispatchFilters = vi.fn();
const mockUpdateSearchParams = vi.fn();

// mock filters context useFiltersContext hook
vi.mock('../../../context/filtersContext/filtersContext', () => {
  return {
    useFiltersContext: () => {
      return {
        state: mockFiltersState,
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

describe('FilterSectionFavourites', () => {
  test('FilterSectionFavourites renders correctly on initial render - i.e. closed', () => {
    render(
      <FilterSectionFavourites updateSearchParams={mockUpdateSearchParams} />
    );

    const favouritesButton = screen.getByRole('button', {
      name: /favourites/i
    });
    expect(favouritesButton).toBeInTheDocument();
  });

  test('renders correctly on initial render with panel open and no favourite selected', () => {
    mockFiltersState = {
      isPanelOpen: true,
      isFacilitiesSelected: false,
      isFavouritesSelected: true,
      isSearchSelected: false,
      isSearchActive: false
    };

    mockLocations[1].isFavourite = false;

    render(
      <FilterSectionFavourites updateSearchParams={mockUpdateSearchParams} />
    );

    const favouritesButton = screen.getByRole('button', {
      name: /favourites/i
    });
    expect(favouritesButton).toBeInTheDocument();

    const favouriteListItem = screen.queryByText('Location 2', {
      exact: false
    });
    expect(favouriteListItem).not.toBeInTheDocument();

    const noFavouritesText = screen.getByText('No favourites found.', {
      exact: false
    });
    expect(noFavouritesText).toBeInTheDocument();
  });

  test('renders correctly on initial render with panel open and one favourite selected', () => {
    mockFiltersState = {
      isPanelOpen: true,
      isFacilitiesSelected: false,
      isFavouritesSelected: true,
      isSearchSelected: false,
      isSearchActive: false
    };

    mockLocations[1].isFavourite = true;

    render(
      <FilterSectionFavourites updateSearchParams={mockUpdateSearchParams} />
    );

    const favouritesButton = screen.getByRole('button', {
      name: /favourites/i
    });
    expect(favouritesButton).toBeInTheDocument();
    expect(favouritesButton).toHaveTextContent('1');
    const favouriteListItem = screen.getByRole('button', {
      name: 'Location 2'
    });
    expect(favouriteListItem).toBeInTheDocument();
  });

  test('correctly dispatches a location ID when a favourite is clicked', async () => {
    const user = userEvent.setup();
    mockFiltersState = {
      isPanelOpen: true,
      isFacilitiesSelected: false,
      isFavouritesSelected: true,
      isSearchSelected: false,
      isSearchActive: false
    };

    mockLocations[1].isFavourite = true;

    render(
      <FilterSectionFavourites updateSearchParams={mockUpdateSearchParams} />
    );

    const favouriteListItem = screen.getByRole('button', {
      name: 'Location 2'
    });

    await user.click(favouriteListItem);
    expect(mockUpdateSearchParams).toHaveBeenCalledTimes(1);
    expect(mockUpdateSearchParams).toHaveBeenLastCalledWith('locationID', '2');

    mockDispatchFilters.mockReset();
  });
});
