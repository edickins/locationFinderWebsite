import { vi, expect, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import IconButton from '../IconButton';

const handleFilterButtonClick = vi.fn();

const buttonLabelText = 'Filter';

const renderFilterButton = (
  isActive: boolean,
  searchParams: URLSearchParams = new URLSearchParams()
) => {
  render(
    <IconButton
      icon='fa-filter'
      onClick={handleFilterButtonClick}
      isSelected={isActive}
      isActive={searchParams.getAll('filters').length > 0}
    >
      <span className='text-xs'>{buttonLabelText}</span>
    </IconButton>
  );
};

describe('IconButton', () => {
  test('should render button with correct text', () => {
    renderFilterButton(false);
    expect(screen.getByText(buttonLabelText)).toBeInTheDocument();
  });

  test('shows active icon when the button passed searchParams', () => {
    const searchParams = new URLSearchParams('?filters=foo+bar');
    renderFilterButton(true, searchParams);
    // find icon
    const activeIcon = screen.getByLabelText('active icon');
    expect(activeIcon).toBeInTheDocument();
  });

  test("doesn't show active icon when the button is passed empty searchParams", async () => {
    renderFilterButton(false);
    // test for icon missing
    const renderedIcon = await screen.queryByRole('img', {
      name: 'active icon'
    });
    expect(renderedIcon).not.toBeInTheDocument();
  });
});
