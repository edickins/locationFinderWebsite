import { IFacility } from '../../context/toiletContext/types';

type FacilityFormProp = {
  facility: IFacility;
  checked: boolean;
  onFilterClicked: (filter: string, isSelected: boolean) => void;
};

function FacilityFormItem({
  facility,
  checked,
  onFilterClicked
}: FacilityFormProp) {
  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterClicked(facility.short_name, e.target.checked);
  };

  return (
    <li className='flex gap-4' role='listitem'>
      <label htmlFor={facility.short_name}>{facility.full_name}</label>
      <input
        type='checkbox'
        name={facility.short_name}
        id={facility.short_name}
        className='self-center'
        onChange={(e) => handleOnClick(e)}
        checked={checked}
        aria-label={`Select ${facility.full_name}`}
      />
    </li>
  );
}

export default FacilityFormItem;
