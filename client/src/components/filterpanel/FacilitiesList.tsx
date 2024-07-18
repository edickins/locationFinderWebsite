import { IFacility } from '../../context/facilitiesContext/types';
import FacilityFormItem from './FacilityFormItem';

type FacilitiesProp = {
  facilities: IFacility[];
  filtersParam: string | null;
  onFilterClicked: (filter: string, isSelected: boolean) => void;
};

function FacilitiesList({
  facilities,
  filtersParam,
  onFilterClicked
}: FacilitiesProp) {
  const filteredFacilities = filtersParam ? filtersParam.split('+') : [];
  return (
    <>
      <ul className='mt-4 list-none bg-white bg-opacity-80 p-2 md:mt-2'>
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
