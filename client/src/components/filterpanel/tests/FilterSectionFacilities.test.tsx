import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FilterSectionFacilities from '../FilterSectionFacilities';
import mockFacilities from './data/facilities';

vi.mock('../../../context/locationContext/locationsContext', async () => {
  return {
    useLocationsContext: () => {
      return { facilities: mockFacilities };
    }
  };
});

describe('FilterSectionFacilities', () => {
  let searchParams = new URLSearchParams();
  const setSearchParams = (newSearchParams: URLSearchParams) => {
    searchParams = newSearchParams;
  };
  let mockFiltersParam = '';
  let mockIsSelected = false;
  const mockDispatchFilters = vi.fn();

  let mockUpdateSearchParams = vi.fn();

  test('Renders initial state correctly when the panel is closed', () => {
    // create fresh searchParams for each test
    searchParams = new URLSearchParams();
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
    // create fresh searchParams for each test
    searchParams = new URLSearchParams();
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
    // create fresh searchParams for each test
    searchParams = new URLSearchParams();
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

  test('Renders correctly when the user selects a second facility', async () => {
    const [localSearchParams, setLocalSearchParams] = useState(
      new URLSearchParams()
    );

    mockUpdateSearchParams = vi
      .fn()
      .mockImplementation((key: string, value: string) => {
        if (!key) return;
        // update the URL with new filters or delete that key if there are no values
        const newSearchParams = new URLSearchParams(
          localSearchParams.toString()
        );
        if (!value) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }

        setLocalSearchParams(newSearchParams);
      });

    // create fresh searchParams for each test
    searchParams = new URLSearchParams();
    searchParams.set('filters', 'facility001');
    mockIsSelected = true;
    mockFiltersParam = 'facility001';
    const user = userEvent.setup();
    render(
      <FilterSectionFacilities
        updateSearchParams={mockUpdateSearchParams}
        filtersParam={localSearchParams.get('filters')}
        isSelected={mockIsSelected}
        dispatchFilters={mockDispatchFilters}
      />
    );

    // initial state - one checkbox selected
    const filtersText = screen.getByText('Filters', { exact: false });
    expect(filtersText).toHaveTextContent('1');

    let filterInputs = screen.getAllByRole('checkbox') as HTMLInputElement[];
    let checkedInputs = filterInputs.filter(
      (checkbox) => checkbox.checked === true
    );

    expect(checkedInputs).toHaveLength(1);

    // select a second checkbox
    const facility2Checkbox = screen.getByRole('checkbox', {
      name: 'facility002'
    });

    await user.click(facility2Checkbox);

    filterInputs = screen.getAllByRole('checkbox') as HTMLInputElement[];
    checkedInputs = filterInputs.filter(
      (checkbox) => checkbox.checked === true
    );
    expect(mockUpdateSearchParams).toHaveBeenCalledTimes(1);
    expect(checkedInputs).toHaveLength(2);

    vi.resetAllMocks();
  });
});
