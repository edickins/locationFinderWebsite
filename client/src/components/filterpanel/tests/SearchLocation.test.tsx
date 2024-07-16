import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import SearchLocation from '../SearchLocation';
import { PanelsActionEnum } from '../../../reducer/filtersReducer/types';

// Create a mock for the action function
const mockDispatchFilters = vi.fn();
const mockDispatchSearchResults = vi.fn();

// Mock the custom hook
vi.mock('../../../context/panelStateContext/panelStateContext', () => ({
  usePanelStateContext: () => ({
    state: {
      isPanelOpen: false,
      isFacilitiesSelected: false,
      isFavouritesSelected: false,
      isSearchSelected: false,
      isSearchActive: false
    },
    searchData: {
      searchTermsMatch: [],
      searchTermsPerfectMatch: [],
      searchTerm: ''
    },
    dispatchFilters: mockDispatchFilters,
    dispatchSearchResults: mockDispatchSearchResults
  })
}));

describe('SearchLocation', () => {
  test('Focussing the text input triggers filter action', async () => {
    // render the search component
    render(<SearchLocation />);
    const user = userEvent.setup();

    // search field responds correctly to being focussed
    const searchInput = screen.getByRole('textbox', { name: /search/i });

    // typing a single letter dispatches the correct events with the correct payload
    await user.click(searchInput);
    expect(mockDispatchFilters).toHaveBeenCalledTimes(1);
    expect(mockDispatchFilters).toHaveBeenCalledWith({
      type: PanelsActionEnum.SEARCH_TERM_CHANGE
    });
  });
});
