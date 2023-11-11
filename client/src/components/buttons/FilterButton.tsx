import { ReactElement } from 'react';
import ButtonActiveIcon from './ButtonActiveIcon';
import { activeFilterSVG } from '../googlemaps/components/markerSVGs';

type Props = {
  onClick: () => void;
  isSelected?: boolean;
  isActive?: boolean;
  children: ReactElement;
  icon: string;
};

function FilterButton({
  onClick,
  isSelected,
  isActive,
  children,
  icon
}: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`mx-auto underline-offset-4 hover:dark:text-dark-secondary-color ${
        isSelected
          ? `dark:text-dark-secondary-color`
          : `dark:text-dark-primary-color`
      }`}
    >
      <div className='flex items-center'>
        <i className={`fa-solid ${icon} text-lg`} data-testid='icon' />
        <span
          className={` ml-1 hover:underline hover:dark:text-dark-secondary-color ${
            isSelected ? 'underline ' : ''
          }`}
        >
          {children}
        </span>
        {/* show the isActive icon if isActive is set */}
        {isActive !== undefined && (
          <ButtonActiveIcon
            icon={activeFilterSVG}
            isActive={isActive}
            data-testid='active-icon'
          />
        )}
      </div>
    </button>
  );
}

FilterButton.defaultProps = {
  isSelected: false,
  isActive: false
};

export default FilterButton;
