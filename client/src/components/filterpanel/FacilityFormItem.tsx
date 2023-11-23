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
    onFilterClicked(facility.short_name, e.target.checked);
  };

  return (
    <li
      className='flex justify-between gap-4 py-2 dark:text-gray-900'
      aria-label='available facility'
      data-testid='facility-form-item'
    >
      <label htmlFor={facility.short_name}>{facility.full_name}</label>
      <input
        data-testid={facility.short_name}
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
