import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { useLocationsContext } from '../../context/locationContext/locationsContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';
import FilterButton from '../buttons/IconButton';
import FavouritesList from './FavouritesList';

type Props = {
  updateSearchParams: (key: string, value: string) => void;
};

function FilterSectionFavourites({ updateSearchParams }: Props) {
  const { state, dispatchFilters } = useFiltersContext();
  const {
    locationsState: { locations }
  } = useLocationsContext();
  const isSelected = state.isFavouritesSelected;

  const onClick = () => {
    dispatchFilters({ type: FiltersActionEnum.FAVOURITES_BUTTON_CLICK });
  };

  const favourites = locations.filter((location) => location.isFavourite);
  return (
    <section id='favourites-container' className='px-4 py-2'>
      <FilterButton
        icon='fa-star'
        onClick={onClick}
        isSelected={isSelected}
        title='Add favourites by clicking the star on the details panel at the bottom of the page.'
      >
        <span className='text-xl' data-testid='main-favourites-button'>
          Favourites{' '}
          {favourites && favourites.length > 0 ? ` (${favourites.length})` : ''}
        </span>
      </FilterButton>
      {isSelected && (
        <FavouritesList
          favourites={favourites}
          updateSearchParams={updateSearchParams}
        />
      )}
    </section>
  );
}

export default FilterSectionFavourites;
