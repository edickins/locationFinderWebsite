function FilterButton({
  handleFilterClick,
  isFilterActive
}: {
  handleFilterClick: () => void;
  isFilterActive: boolean;
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
      <span className='ml-1 text-xs'>Filter toilets</span>
    </button>
  );
}

export default FilterButton;
