import { ReactElement } from 'react';

type Props = {
  onClick: () => void;
  isActive: boolean;
  largeText?: boolean;
  children: ReactElement;
  icon: string;
};

function FilterButton({ onClick, isActive: isActive, children, icon }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`mx-auto underline-offset-4  ${
        isActive
          ? `dark:text-dark-secondary-color`
          : `dark:text-dark-primary-color`
      }`}
    >
      <div className='flex'>
        <i className={`fa-solid ${icon} text-lg`}></i>
        <span
          className={` ml-1 hover:underline ${isActive ? 'underline' : ''}`}
        >
          {children}
        </span>
      </div>
    </button>
  );
}

export default FilterButton;
