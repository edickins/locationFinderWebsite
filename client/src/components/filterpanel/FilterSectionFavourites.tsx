import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';
import FilterButton from '../buttons/FilterButton';

function FilterSectionFavourites() {
  const { state, dispatchFilters } = useFiltersContext();
  const isSelected = state.isFavouritesSelected;

  const onClick = () => {
    dispatchFilters({ type: FiltersActionEnum.FILTER_BUTTON_CLICK });
  };
  return (
    <section id='favourites-container' className='p-4'>
      <FilterButton icon='fa-star' onClick={onClick} isSelected={isSelected}>
        <span className='text-xl'>Favourites</span>
      </FilterButton>
    </section>
  );
}

export default FilterSectionFavourites;
