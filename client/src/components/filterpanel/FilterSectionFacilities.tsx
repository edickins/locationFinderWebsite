import { useState, useEffect } from 'react';
import FacilitiesList from './FacilitiesList';
import FilterButton from '../buttons/FilterButton';
import { useLocationsContext } from '../../context/locationContext/locationsContext';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';

interface Props {
  isActive: boolean;
  updateSearchParams: (key: string, value: string) => void;
  filtersParam: string | null;
}

function FilterSectionFacilities({
  isActive,
  updateSearchParams,
  filtersParam
}: Props) {
  const { facilities } = useLocationsContext();

  const [activeFilters, setActiveFilters] = useState('');

  const { state, dispatchFilters } = useFiltersContext();
  const isSelected = state.isFacilitiesSelected;

  const onClick = () => {
    dispatchFilters({ type: FiltersActionEnum.FILTER_BUTTON_CLICK });
  };

  useEffect(() => {
    const arr = filtersParam ? filtersParam.split('+') : [];
    setActiveFilters(` ${arr.length} active`);
  }, [filtersParam]);

  const onFilterClicked = (facility: string, isFilterSelected: boolean) => {
    const arr = filtersParam ? filtersParam.split('+') : [].filter(Boolean);
    const index = arr.indexOf(facility);

    // add or remove facilities
    if (isFilterSelected && index === -1) {
      arr.push(facility);
    } else if (!isFilterSelected && index > -1) {
      arr.splice(index, 1);
    }
    updateSearchParams('filters', arr.join('+'));
  };

  return (
    <section id='facilities-container' className='px-4 py-2 md:py-1'>
      <FilterButton
        icon='fa-filter'
        onClick={onClick}
        isSelected={isSelected}
        isActive={isActive}
        title='Click me to filter toilets by facilities offered at that location.'
      >
        <span className='text-xl'>Filters{activeFilters}</span>
      </FilterButton>
      {isSelected && (
        <FacilitiesList
          facilities={facilities}
          filtersParam={filtersParam}
          onFilterClicked={onFilterClicked}
          data-testid='facilities-list'
        />
      )}
    </section>
  );
}

export default FilterSectionFacilities;
