import { ReactElement } from 'react';
import ButtonActiveIcon from './ButtonActiveIcon';
import { activeFilterSVG } from '../googlemaps/components/markerSVGs';

type Props = {
  onClick: () => void;
  isSelected?: boolean;
  isActive?: boolean;
  reverseColours?: boolean;
  children: ReactElement;
  icon: string;
  title?: string;
};

function IconButton({
  onClick,
  isSelected,
  isActive,
  reverseColours,
  children,
  icon,
  title
}: Props) {
  const regularColour = reverseColours
    ? 'text-light-secondary-color dark:text-dark-secondary-color'
    : 'text-light-primary-color dark:text-dark-primary-color';
  const hoverColour = reverseColours
    ? `text-light-primary-color dark:text-dark-primary-color`
    : 'text-light-secondary-color dark:text-dark-secondary-color';

  return (
    <button
      type='button'
      onClick={onClick}
      title={title !== '' ? title : undefined}
      className={`mx-auto underline-offset-4 md:mx-0 ${regularColour} hover:${hoverColour} ${
        isSelected ? hoverColour : regularColour
      }`}
    >
      <div className='flex content-end items-center'>
        <span role='img'>
          <i className={`fa-solid grow ${icon} text-base`} />
        </span>
        <span
          className={` ml-1 hover:underline  ${isSelected ? 'underline ' : ''}`}
        >
          {children}
        </span>
        {/* show the isActive icon if isActive is set */}
        {isActive && (
          <ButtonActiveIcon icon={activeFilterSVG} isActive={isActive} />
        )}
      </div>
    </button>
  );
}

IconButton.defaultProps = {
  isSelected: false,
  isActive: false,
  reverseColours: false,
  title: ''
};

export default IconButton;
