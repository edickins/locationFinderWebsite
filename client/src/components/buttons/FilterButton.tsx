function FilterButton({
  onClick: handleFilterClick,
  isFilterActive,
  largeText
}: {
  onClick: () => void;
  isFilterActive: boolean;
  largeText?: boolean;
}) {
  return (
    <button
      type='button'
      onClick={handleFilterClick}
      className={` ${
        isFilterActive
          ? `dark:text-dark-secondary-color`
          : `dark:text-dark-primary-color`
      }`}
    >
      <i className='fa-solid fa-filter'></i>
      <span className={`ml-1 ${largeText ? 'text-xl' : 'text-xs'}`}>
        Filter toilets
      </span>
    </button>
  );
}

export default FilterButton;
