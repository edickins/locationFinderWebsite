import { IFacility } from '../../context/toiletContext/types';
import FacilityFormItem from './FacilityFormItem';

type FacilitiesProp = {
  facilities: IFacility[];
};

function FacilitiesList({ facilities }: FacilitiesProp) {
  return (
    <>
      <ul className='list-none'>
        {facilities &&
          facilities.map((facility) => {
            return (
              <FacilityFormItem facility={facility} key={facility.short_name} />
            );
          })}
      </ul>
    </>
  );
}

export default FacilitiesList;
