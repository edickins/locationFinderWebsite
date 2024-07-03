import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavouritesList from '../FavouritesList';
import mockLocations from './data/locations';

// Use mockLocations in your tests!

describe('FavouritesList', () => {
  test('Displays message if no favourites are selected', () => {
    // render FavouritesList
    render(<FavouritesList favourites={[]} updateSearchParams={vi.fn()} />);
    const noResultsText = screen.getByText('No favourites found.', {
      exact: false
    });

    expect(noResultsText).toBeInTheDocument();
  });

  test('Displays correct number of SearchResultItems if favourites are passed in props', () => {
    // render FavouritesList
    render(
      <FavouritesList favourites={mockLocations} updateSearchParams={vi.fn()} />
    );
    // correct number of SearchResultItems are displayed
    const favouriteButtons = screen.getAllByRole('button');
    expect(favouriteButtons).toHaveLength(3);
  });

  test('Clicking on a button calls updateSearchParams with the correct arguments', async () => {
    const mockUpdateSearchParams = vi.fn();
    const user = userEvent.setup();

    // render FavouritesList
    render(
      <FavouritesList
        favourites={mockLocations}
        updateSearchParams={mockUpdateSearchParams}
      />
    );

    // click on the first button
    const location1Button = screen.getByRole('button', { name: 'Location 1' });
    await user.click(location1Button);

    expect(mockUpdateSearchParams).toHaveBeenLastCalledWith('locationID', '1');
    // assert function was called correctly
    expect(mockUpdateSearchParams).toHaveBeenCalledTimes(1);
  });
});
