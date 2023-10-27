import React from 'react';
import { IFacility } from '../context/toiletContext/types';

type FacilityFormProp = {
  facility: IFacility;
};

function FacilityFormItem({ facility }: FacilityFormProp) {
  return (
    <li key={facility.short_name} className='flex gap-4'>
      {facility.full_name}
      <input
        type='checkbox'
        name={facility.short_name}
        id={facility.short_name}
        className='self-center'
      />
    </li>
  );
}

export default FacilityFormItem;
