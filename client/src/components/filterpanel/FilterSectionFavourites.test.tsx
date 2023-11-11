import { MemoryRouter } from 'react-router-dom';
import { describe, test, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterSectionFavourites from './FilterSectionFavourites';

const onClick = vi.fn();

describe('FiltersSectionFacilities', () => {
  test('should only render the facilities list if this section is selected', async () => {
    render(
      <MemoryRouter>
        <FilterSectionFavourites onClick={onClick} isSelected />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const filterButton = screen.getByRole('button', { name: /favourites/i });
    await user.click(filterButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
