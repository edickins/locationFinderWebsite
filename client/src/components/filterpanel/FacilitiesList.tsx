import { IFacility } from '../../context/toiletContext/types';
import FacilityFormItem from './FacilityFormItem';

type FacilitiesProp = {
  facilities: IFacility[];
  filteredFacilities: string[];
  onFilterClicked: (filter: string, isSelected: boolean) => void;
};

function FacilitiesList({
  facilities,
  filteredFacilities,
  onFilterClicked
}: FacilitiesProp) {
  return (
    <>
      <ul className='list-none'>
        {facilities &&
          facilities.map((facility) => {
            return (
              <FacilityFormItem
                facility={facility}
                key={facility.short_name}
                onFilterClicked={onFilterClicked}
                checked={filteredFacilities.includes(facility.short_name)}
              />
            );
          })}
      </ul>
    </>
  );
}

export default FacilitiesList;
