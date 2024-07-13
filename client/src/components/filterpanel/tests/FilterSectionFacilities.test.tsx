import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FilterSectionFacilities from '../FilterSectionFacilities';
import mockFacilities from './data/facilities';

// mock the locationsContext - this is a partial mock. see facilitiesContext for full spec
vi.mock('../../../context/facilitiesContext/facilitiesContext', async () => {
  return {
    useFacilitiesContext: () => {
      return { facilities: mockFacilities };
    }
  };
});

describe('FilterSectionFacilities', () => {
  let mockFiltersParam = '';
  let mockIsSelected = false;
  const mockDispatchFilters = vi.fn();

  const mockUpdateSearchParams = vi.fn();

  test('Renders initial state correctly when the panel is closed', () => {
    // create fresh searchParams for each test

    render(
      <FilterSectionFacilities
        updateSearchParams={mockUpdateSearchParams}
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
        updateSearchParams={mockUpdateSearchParams}
        filtersParam={mockFiltersParam}
        isSelected={mockIsSelected}
        dispatchFilters={mockDispatchFilters}
      />
    );

    const filterInputs = screen.getAllByRole('checkbox');
    expect(filterInputs).toHaveLength(3);
  });

  test('Renders correctly when the panel is open and filtersParam has values in it', () => {
    mockIsSelected = true;
    mockFiltersParam = 'facility001';
    render(
      <FilterSectionFacilities
        updateSearchParams={mockUpdateSearchParams}
        filtersParam={mockFiltersParam}
        isSelected={mockIsSelected}
        dispatchFilters={mockDispatchFilters}
      />
    );

    const filtersText = screen.getByText('Filters', { exact: false });
    expect(filtersText).toHaveTextContent('1');

    const filterInputs = screen.getAllByRole('checkbox') as HTMLInputElement[];
    const checkedInputs = filterInputs.filter(
      (checkbox) => checkbox.checked === true
    );

    expect(checkedInputs).toHaveLength(1);
  });
});
