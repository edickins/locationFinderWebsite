import FacilitiesList from './FacilitiesList';
import FilterButton from '../buttons/FilterButton';
import { useState } from 'react';
import { useToiletsContext } from '../../context/toiletContext/toiletsContext';
import { useSearchParams } from 'react-router-dom';

interface Props {
  onClick: () => void;
  isFacilitiesActive: boolean;
}

function FilterSectionFacilities({ onClick, isFacilitiesActive }: Props) {
  const { facilities } = useToiletsContext();
  const [searchParams, setSearchParams] = useSearchParams();
  let filtersParams = searchParams.get('filters') || '';

  const onFilterClicked = (facility: string, isSelected: boolean) => {
    let arr = filtersParams.split('+');

    if (isSelected) {
      let index = arr.indexOf(facility);
      if (index > -1) return;
      arr.push(facility);
      filtersParams = arr.join('+');
    }

    if (!isSelected) {
      let index = arr.indexOf(facility);
      if (index === -1) return;
      arr.splice(index, 1);
      filtersParams = arr.join('+');
    }
    setSearchParams({ filters: filtersParams });
  };

  return (
    <section id='facilities-container' className='p-4'>
      <FilterButton
        icon='fa-filter'
        onClick={onClick}
        isActive={isFacilitiesActive}
      >
        <span className='text-xl'>Filter</span>
      </FilterButton>
      {isFacilitiesActive && (
        <FacilitiesList
          facilities={facilities}
          filteredFacilities={filtersParams.split('+')}
          onFilterClicked={onFilterClicked}
        />
      )}
    </section>
  );
}

export default FilterSectionFacilities;
