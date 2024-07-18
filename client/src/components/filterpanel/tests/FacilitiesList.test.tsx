import UserEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { IFacility } from '../../../context/facilitiesContext/types';
import FacilitiesList from '../FacilitiesList';

const facilities: IFacility[] = [
  { full_name: 'facility001', short_name: 'facility001', id: 'facility001' },
  {
    full_name: 'facility002',
    short_name: 'facility002',
    id: 'facility002'
  },
  {
    full_name: 'facility003',
    short_name: 'facility003',
    id: 'facility003'
  },
  {
    full_name: 'facility004',
    short_name: 'facility004',
    id: 'facility004'
  },
  {
    full_name: 'facility005',
    short_name: 'facility005',
    id: 'facility005'
  },
  {
    full_name: 'facility006',
    short_name: 'facility006',
    id: 'facility006'
  },
  {
    full_name: 'facility007',
    short_name: 'facility007',
    id: 'facility007'
  },
  {
    full_name: 'facility008',
    short_name: 'facility008',
    id: 'facility008'
  }
];

const filtersParam = `facility001+facility002`;

const mockOnFilterClicked = vi.fn();

describe('FacilitiesList', () => {
  it('renders the correct number of FacilityFormItems', () => {
    render(
      <FacilitiesList
        facilities={facilities}
        filtersParam={filtersParam}
        onFilterClicked={mockOnFilterClicked}
      />
    );

    const formItems = screen.getAllByRole('checkbox');
    expect(formItems).toHaveLength(8);
  });

  it('sets the correct number of FacilityFormItems to checked.', () => {
    render(
      <FacilitiesList
        facilities={facilities}
        filtersParam={filtersParam}
        onFilterClicked={mockOnFilterClicked}
      />
    );

    // find in document the correct number of facilities that have a true value on the checkbox (2)
    const allCheckboxes = screen.getAllByRole('checkbox');
    expect(allCheckboxes).toHaveLength(8);

    const checkedCheckboxes = allCheckboxes.filter(
      (checkbox: HTMLElement): checkbox is HTMLInputElement => {
        return (checkbox as HTMLInputElement).checked;
      }
    );

    expect(checkedCheckboxes).toHaveLength(2);
  });

  it('calls onFilterClicked with the correct arguments', async () => {
    render(
      <FacilitiesList
        facilities={facilities}
        filtersParam={filtersParam}
        onFilterClicked={mockOnFilterClicked}
      />
    );
    const user = UserEvent.setup();

    const checkboxInput = screen.getByRole('checkbox', { name: 'facility003' });
    await user.click(checkboxInput);

    expect(mockOnFilterClicked).toHaveBeenCalledOnce();
    expect(mockOnFilterClicked).toHaveBeenCalledWith('facility003', true);
  });
});
