import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import SearchResultItem from '../SearchResultItem';
import mockLocations from './data/locations';

const mockLocation = mockLocations[0];
const mockOnItemClicked = vi.fn();

describe('SearchResultItem', () => {
  test('SearchResultItem displays the long_name of a location', () => {
    render(
      <SearchResultItem
        location={mockLocation}
        onItemClick={mockOnItemClicked}
      />
    );

    const itemButton = screen.getByRole('button', {
      name: mockLocation.long_name
    });
    expect(itemButton).toBeInTheDocument();
  });

  test('SearchResultItem displays the long_name of a location', async () => {
    const user = userEvent.setup();
    render(
      <SearchResultItem
        location={mockLocation}
        onItemClick={mockOnItemClicked}
      />
    );

    const itemButton = screen.getByRole('button', {
      name: mockLocation.long_name
    });

    await user.click(itemButton);
    expect(mockOnItemClicked).toHaveBeenCalledTimes(1);
    expect(mockOnItemClicked).toHaveBeenCalledWith('1');
  });
});
