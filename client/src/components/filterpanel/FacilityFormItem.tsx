import { IFacility } from '../../context/locationContext/types';

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
    console.log('handleOnClick');
    onFilterClicked(facility.short_name, e.target.checked);
  };

  return (
    <li className='flex justify-between gap-4 bg-white px-2 py-2 hover:bg-gray-100 dark:text-gray-900 md:mb-1 md:py-1'>
      <label htmlFor={facility.short_name}>{facility.full_name}</label>
      <input
        type='checkbox'
        name={facility.short_name}
        id={facility.short_name}
        className='self-center'
        onChange={(e) => handleOnClick(e)}
        checked={checked}
      />
    </li>
  );
}

export default FacilityFormItem;
