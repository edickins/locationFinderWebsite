import { describe, vi, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterPanelNav from '../FilterPanelNav';
import { useFiltersContext } from '../../../context/filtersContext/filtersContext';

const filtersParam = '';

// Create a mock for the action function
const mockAction = vi.fn();

// Mock your custom hook
vi.mock('./customHook', () => ({
  useFiltersContext: () => ({
    state: {
      isPanelOpen: false,
      isFacilitiesSelected: false,
      isFavouritesSelected: false,
      isSearchSelected: false,
      isSearchActive: false
    },
    action: mockAction
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
  });

  test('should call the action function', async () => {
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
    expect(mockAction).toHaveBeenCalledOnce();
    // You can also assert other expectations on the action function
  });
});
