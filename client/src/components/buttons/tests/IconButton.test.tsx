import { vi, expect, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import FilterButton from '../IconButton';

const handleFilterButtonClick = vi.fn();
const searchParams = new URLSearchParams('?filters=foo+bar');

const renderFilterButton = (isActive: boolean) => {
  render(
    <FilterButton
      icon='fa-filter'
      onClick={handleFilterButtonClick}
      isSelected={isActive}
      isActive={searchParams.getAll('filters').length > 0}
    >
      <span className='text-xs'>Filter</span>
    </FilterButton>
  );
};

describe('FilterButton', () => {
  test('should render button with correct text', () => {
    renderFilterButton(false);
    expect(screen.getByText(/filter/i)).toBeInTheDocument();
  });

  test('should render button with correct icon', () => {
    renderFilterButton(false);

    const iconWrapper = screen.getByRole('img', { name: 'button icon' });
    expect(iconWrapper).toBeInTheDocument();
    expect(iconWrapper.firstChild).toHaveClass('fa-filter');
  });
});
