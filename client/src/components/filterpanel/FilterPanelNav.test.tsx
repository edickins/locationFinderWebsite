import { describe, vi, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterPanelNav from './FilterPanelNav';

const handleFindLocationButtonClick = vi.fn();
const filtersParam = '';

describe('FilterPanelNav', () => {
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
});
