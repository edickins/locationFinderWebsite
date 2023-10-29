import { ReactElement } from 'react';

type Props = {
  onClick: () => void;
  isActive: boolean;
  largeText?: boolean;
  children: ReactElement;
  icon: string;
};

function FilterButton({
  onClick: handleFilterClick,
  isActive: isActive,
  children,
  icon
}: Props) {
  return (
    <button
      type='button'
      onClick={handleFilterClick}
      className={`underline-offset-4 hover:underline hover:dark:text-dark-secondary-color ${
        isActive
          ? `dark:text-dark-secondary-color`
          : `dark:text-dark-primary-color`
      }`}
    >
      <i className={`fa-solid ${icon}`}></i>
      <span className={` ml-1  ${isActive ? 'underline' : ''}`}>
        {children}
      </span>
    </button>
  );
}

export default FilterButton;
