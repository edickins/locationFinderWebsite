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
const mockChecked = true;

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

    expect(mockOnFilterClicked).toBeCalledTimes(1);
    expect(mockOnFilterClicked).toBeCalledWith(mockFacility.short_name, false);
  });

  it('should check the component checkbox according to the argument provided.', () => {
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
});
