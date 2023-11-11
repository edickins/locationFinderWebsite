import { MemoryRouter } from 'react-router-dom';
import { describe, test, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterSectionFacilities from './FilterSectionFacilities';

const onClick = vi.fn();

describe('FiltersSectionFacilities', () => {
  test('should call the onClick handler when the filterButton in the component is clicked', async () => {
    render(
      <MemoryRouter>
        <FilterSectionFacilities
          onClick={onClick}
          isSelected
          isActive={false}
        />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const filterButton = screen.getByRole('button', { name: /filter/i });
    await user.click(filterButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
