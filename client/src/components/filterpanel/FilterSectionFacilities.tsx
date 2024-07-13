import { useState, useEffect } from 'react';
import FacilitiesList from './FacilitiesList';
import FilterButton from '../buttons/IconButton';
import { useFacilitiesContext } from '../../context/facilitiesContext/facilitiesContext';
import {
  FiltersActionEnum,
  FiltersActionType
} from '../../reducer/filtersReducer/types';

interface Props {
  updateSearchParams: (key: string, value: string) => void;
  filtersParam: string | null;
  isSelected: boolean;
  dispatchFilters: React.Dispatch<FiltersActionType>;
}

function FilterSectionFacilities({
  updateSearchParams,
  filtersParam,
  isSelected,
  dispatchFilters
}: Props) {
  const { facilities } = useFacilitiesContext();
  const [activeFilters, setActiveFilters] = useState('');
  const isActive = !!filtersParam;

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
        />
      )}
    </section>
  );
}

export default FilterSectionFacilities;
