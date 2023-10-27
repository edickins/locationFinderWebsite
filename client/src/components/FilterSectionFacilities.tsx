import FacilitiesList from './FacilitiesList';
import { IFacility } from '../context/toiletContext/types';

interface FilterSectionFacilitiesProps {
  facilities: IFacility[];
  handleFilterClick: () => void;
}

function FilterSectionFacilities({
  facilities,
  handleFilterClick
}: FilterSectionFacilitiesProps) {
  return (
    <section id='facilities-container' className='p-4'>
      <h2 className='dark:text-dark-secondary-color text-xl font-semibold'>
        Filter by facilities
      </h2>
      <FacilitiesList
        facilities={facilities}
        handleFilterClick={handleFilterClick}
      />
    </section>
  );
}

export default FilterSectionFacilities;
