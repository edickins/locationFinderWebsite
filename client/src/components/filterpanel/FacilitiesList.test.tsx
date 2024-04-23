import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { IFacility } from '../../context/locationContext/types';
import FacilitiesList from './FacilitiesList';

const mockFacilitiesData = [
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

const facilities: IFacility[] = mockFacilitiesData.map((facility) => {
  return facility;
});

const filteredFacilities = ['facility001', 'facility002'];

const onFilterClicked = vi.fn();

describe('FacilitiesList', () => {
  it('renders the correct number of FacilityFormItems', () => {
    render(
      <FacilitiesList
        facilities={facilities}
        filtersParam={filteredFacilities}
        onFilterClicked={onFilterClicked}
      />
    );

    const formItems = screen.getAllByTestId('facility-form-item');

    expect(formItems).toHaveLength(8);
  });

  it('selects the correct number of FacilityFormItems to true.', () => {
    render(
      <FacilitiesList
        facilities={facilities}
        filtersParam={filteredFacilities}
        onFilterClicked={onFilterClicked}
      />
    );

    const facilityCheckboxes = filteredFacilities.map((filteredFacility) => {
      return screen.getByTestId(filteredFacility);
    });

    expect(facilityCheckboxes).toHaveLength(2);

    facilityCheckboxes.forEach((checkbox) => {
      expect(checkbox).toHaveProperty('checked', true);
    });
  });
});
