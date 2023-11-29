import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';
import FilterButton from '../buttons/FilterButton';

function FilterSectionFavourites() {
  const { state, dispatchFilters } = useFiltersContext();
  const isSelected = state.isFavouritesSelected;

  const onClick = () => {
    dispatchFilters({ type: FiltersActionEnum.FAVOURITES_BUTTON_CLICK });
  };
  return (
    <section id='favourites-container' className='px-4 py-2'>
      <FilterButton icon='fa-star' onClick={onClick} isSelected={isSelected}>
        <span className='text-xl'>Favourites</span>
      </FilterButton>
    </section>
  );
}

export default FilterSectionFavourites;
