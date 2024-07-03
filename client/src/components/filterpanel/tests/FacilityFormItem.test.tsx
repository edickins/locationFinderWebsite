import UserEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FacilityFormItem from '../FacilityFormItem';

const mockOnFilterClicked = vi.fn();
const mockFacility = {
  full_name: 'facility001',
  short_name: 'facility001',
  id: 'facility001'
};
let mockChecked = true;

describe('FacilityFormItem', () => {
  it('should call the onFilterClicked method the correct number of times with the correct arguments.', async () => {
    render(
      <FacilityFormItem
        onFilterClicked={mockOnFilterClicked}
        facility={mockFacility}
        checked={mockChecked}
      />
    );

    const user = UserEvent.setup();

    const checkboxInput = screen.getByRole('checkbox', {
      name: mockFacility.short_name
    });

    await user.click(checkboxInput);

    expect(mockOnFilterClicked).toHaveBeenCalledTimes(1);
    expect(mockOnFilterClicked).toHaveBeenCalledWith(
      mockFacility.short_name,
      false
    );
  });

  it('should check the component checkbox', () => {
    render(
      <FacilityFormItem
        onFilterClicked={mockOnFilterClicked}
        facility={mockFacility}
        checked={mockChecked}
      />
    );

    const checkboxInput = screen.getByRole('checkbox', {
      name: mockFacility.short_name
    });

    expect(checkboxInput).toHaveProperty('checked', true);
  });

  it('should not check the component checkbox', () => {
    mockChecked = false;
    render(
      <FacilityFormItem
        onFilterClicked={mockOnFilterClicked}
        facility={mockFacility}
        checked={mockChecked}
      />
    );

    const checkboxInput = screen.getByRole('checkbox', {
      name: mockFacility.short_name
    });

    expect(checkboxInput).toHaveProperty('checked', false);
  });
});
