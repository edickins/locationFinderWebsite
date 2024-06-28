import { describe, vi, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterPanelNav from '../FilterPanelNav';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { FiltersActionEnum } from '../../../reducer/filtersReducer/types';

const filtersParam = '';

// Create a mock for the action function
const mockDispatch = vi.fn();

// Mock the custom hook
vi.mock('../../../context/filtersContext/filtersContext', () => ({
  useFiltersContext: () => ({
    state: {
      isPanelOpen: false,
      isFacilitiesSelected: false,
      isFavouritesSelected: false,
      isSearchSelected: false,
      isSearchActive: false
    },
    dispatchFilters: mockDispatch
  })
}));

describe('FilterPanelNav', () => {
  const handleFindLocationButtonClick = vi.fn();

  test('should call eventhandlers when buttons are clicked', async () => {
    render(
      <MemoryRouter>
        <FilterPanelNav
          handleFindLocationButtonClick={handleFindLocationButtonClick}
          filtersParam={filtersParam}
        />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const nearestToiletButton = screen.getByRole('button', {
      name: 'Find nearest toilet'
    });

    await user.click(nearestToiletButton);

    expect(handleFindLocationButtonClick).toHaveBeenCalledOnce();

    vi.resetAllMocks(); // all mock.calls[][] array values are reset.
  });

  test('should call the reducer action function when a filter button is clicked', async () => {
    // Render your component
    render(
      <MemoryRouter>
        <FilterPanelNav
          handleFindLocationButtonClick={handleFindLocationButtonClick}
          filtersParam={filtersParam}
        />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const filterButton = screen.getByRole('button', { name: /Filter/i });
    await user.click(filterButton);

    // Assert that the action function was called
    expect(mockDispatch).toHaveBeenCalledOnce();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: FiltersActionEnum.FILTER_BUTTON_CLICK
    });

    vi.resetAllMocks(); // all mock.calls[][] array values are reset.
  });

  test('correctly calls the reducer action function when multiple filters button are clicked', async () => {
    // Render your component
    render(
      <MemoryRouter>
        <FilterPanelNav
          handleFindLocationButtonClick={handleFindLocationButtonClick}
          filtersParam={filtersParam}
        />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const filterButton = screen.getByRole('button', { name: /Filter/i });
    await user.click(filterButton);

    // Assert that the action function was called
    expect(mockDispatch).toHaveBeenCalledOnce();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: FiltersActionEnum.FILTER_BUTTON_CLICK
    });

    const favouritesButton = screen.getByRole('button', {
      name: /Favourites/i
    });
    await user.click(favouritesButton);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: FiltersActionEnum.FAVOURITES_BUTTON_CLICK
    });

    vi.resetAllMocks(); // all mock.calls[][] array values are reset.
  });
});
