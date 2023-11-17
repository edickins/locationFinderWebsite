import { describe, vi, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterPanelNav from './FilterPanelNav';

const handleFindToiletButtonClick = vi.fn();

vi.doMock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useSearchParams: () => vi.fn() // replace useNavigate with your mock
}));

describe('FilterPanelNav', () => {
  test('should render all buttons with correct text', async () => {
    render(
      <MemoryRouter>
        <FilterPanelNav
          handleFindToiletButtonClick={handleFindToiletButtonClick}
          setSearchTermMatches={() => {}}
          setSearchTermPerfectMatches={() => {}}
        />
      </MemoryRouter>
    );
    const filterButton = screen.getByRole('button', { name: 'Filter' });
    const favouritesButton = screen.getByRole('button', { name: 'Favourites' });
    const nearestToiletButton = screen.getByRole('button', {
      name: 'Find a toilet near me'
    });
    expect(filterButton).toBeInTheDocument();
    expect(favouritesButton).toBeInTheDocument();
    expect(nearestToiletButton).toBeInTheDocument();
  });

  test('should call eventhandlers when buttons are clicked', async () => {
    render(
      <MemoryRouter>
        <FilterPanelNav
          handleFindToiletButtonClick={handleFindToiletButtonClick}
          setSearchTermMatches={() => {}}
          setSearchTermPerfectMatches={() => {}}
        />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const nearestToiletButton = screen.getByRole('button', {
      name: 'Find a toilet near me'
    });

    await user.click(nearestToiletButton);

    expect(handleFindToiletButtonClick).toHaveBeenCalledOnce();
  });
});
