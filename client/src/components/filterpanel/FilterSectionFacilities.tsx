import FacilitiesList from './FacilitiesList';
import FilterButton from '../buttons/FilterButton';
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
    let arr = filtersParams.split('+').filter(Boolean);
    const index = arr.indexOf(facility);

    // add or remove facilities
    if (isSelected && index === -1) {
      arr.push(facility);
    } else if (!isSelected && index > -1) {
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
        isSelected={isFacilitiesActive}
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
