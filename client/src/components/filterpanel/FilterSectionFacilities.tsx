import FacilitiesList from './FacilitiesList';
import { IFacility } from '../../context/toiletContext/types';

interface FilterSectionFacilitiesProps {
  facilities: IFacility[];
  onClick: () => void;
  isFacilitiesActive: boolean;
  setIsFacilitiesActive: (state: boolean) => void;
}

function FilterSectionFacilities({
  facilities,
  onClick,
  isFacilitiesActive,
  setIsFacilitiesActive
}: FilterSectionFacilitiesProps) {
  return (
    <section id='facilities-container' className='p-4'>
      <h2
        className={`text-xl font-semibold ${
          isFacilitiesActive
            ? `dark:text-dark-secondary-color`
            : `dark:text-dark-primary-color`
        }`}
      >
        <i className='fa-solid fa-filter'></i>Filter by facilities &gt;
      </h2>
      {isFacilitiesActive && <FacilitiesList facilities={facilities} />}
    </section>
  );
}

export default FilterSectionFacilities;
