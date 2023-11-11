import { useSearchParams } from 'react-router-dom';
import FacilitiesList from './FacilitiesList';
import FilterButton from '../buttons/FilterButton';
import { useLocationsContext } from '../../context/locationContext/locationsContext';

interface Props {
  onClick: () => void;
  isSelected: boolean;
  isActive: boolean;
}

function FilterSectionFacilities({ onClick, isSelected, isActive }: Props) {
  const { facilities } = useLocationsContext();
  const [searchParams, setSearchParams] = useSearchParams();
  let filtersParams = searchParams.get('filters') || '';

  const onFilterClicked = (facility: string, isFilterSelected: boolean) => {
    const arr = filtersParams.split('+').filter(Boolean);
    const index = arr.indexOf(facility);

    // add or remove facilities
    if (isFilterSelected && index === -1) {
      arr.push(facility);
    } else if (!isFilterSelected && index > -1) {
      arr.splice(index, 1);
    } else {
      return;
    }

    filtersParams = arr.join('+');

    // update the URL with new filters or delete that key if there are no values
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (filtersParams === '') {
      newSearchParams.delete('filters');
    } else {
      newSearchParams.set('filters', filtersParams);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <section id='facilities-container' className='p-4'>
      <FilterButton
        icon='fa-filter'
        onClick={onClick}
        isSelected={isSelected}
        isActive={isActive}
      >
        <span className='text-xl'>Filter</span>
      </FilterButton>
      {isSelected && (
        <FacilitiesList
          facilities={facilities}
          filteredFacilities={filtersParams.split('+')}
          onFilterClicked={onFilterClicked}
          data-testid='facilities-list'
        />
      )}
    </section>
  );
}

export default FilterSectionFacilities;
