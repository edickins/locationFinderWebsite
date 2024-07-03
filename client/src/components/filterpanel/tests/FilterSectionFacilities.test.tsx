import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FilterSectionFacilities from '../FilterSectionFacilities';
import mockFacilities from './data/facilities';
import { IFacility } from '../../../context/locationContext/types';

const mockUpdateSearchParams = vi.fn();
let mockFiltersParam = '';
let mockIsSelected = false;
const mockDispatchFilters = vi.fn();

vi.mock('../../../context/locationContext/locationsContext', async () => {
  return {
    useLocationsContext: () => {
      return { facilities: mockFacilities };
    }
  };
});

describe('FilterSectionFacilities', () => {
  test('Renders initial state correctly when the panel is closed', () => {
    render(
      <FilterSectionFacilities
        updateSearchParams={mockDispatchFilters}
        filtersParam={mockFiltersParam}
        isSelected={mockIsSelected}
        dispatchFilters={mockDispatchFilters}
      />
    );

    const filtersText = screen.getByText('Filters', { exact: false });
    expect(filtersText).toHaveTextContent('0');
  });
  test('Renders initial state correctly when the panel is open', () => {
    mockIsSelected = true;
    render(
      <FilterSectionFacilities
        updateSearchParams={mockDispatchFilters}
        filtersParam={mockFiltersParam}
        isSelected={mockIsSelected}
        dispatchFilters={mockDispatchFilters}
      />
    );

    const filterInputs = screen.getAllByRole('checkbox');
    expect(filterInputs).toHaveLength(3);
  });

  test('Renders initial state correctly when the panel is open and filtersParam has values in it', () => {
    mockIsSelected = true;
    mockFiltersParam = 'facility001';
    render(
      <FilterSectionFacilities
        updateSearchParams={mockDispatchFilters}
        filtersParam={mockFiltersParam}
        isSelected={mockIsSelected}
        dispatchFilters={mockDispatchFilters}
      />
    );

    const filtersText = screen.getByText('Filters', { exact: false });
    expect(filtersText).toHaveTextContent('1');

    const filterInputs = screen.getAllByRole('checkbox');
    const checkedInputs: boolean[] = filterInputs.map(
      (checkbox: HTMLInputElement) => checkbox.checked
    );

    // expect(checkedInputs).toHaveLength(1);
  });
});
