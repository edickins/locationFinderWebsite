import FacilitiesList from './FacilitiesList';
import { IFacility } from '../../context/toiletContext/types';
import FilterButton from '../buttons/FilterButton';

interface FilterSectionFacilitiesProps {
  facilities: IFacility[];
  filteredFacilities: string[];
  onFilterClicked: (filter: string, isSelected: boolean) => void;
  onClick: () => void;
  isFacilitiesActive: boolean;
  setIsFacilitiesActive: (state: boolean) => void;
}

function FilterSectionFacilities({
  facilities,
  filteredFacilities,
  onFilterClicked,
  onClick,
  isFacilitiesActive,
  setIsFacilitiesActive
}: FilterSectionFacilitiesProps) {
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
          filteredFacilities={filteredFacilities}
          onFilterClicked={onFilterClicked}
        />
      )}
    </section>
  );
}

export default FilterSectionFacilities;
