import { useSearchParams } from 'react-router-dom';
import FilterButton from '../buttons/FilterButton';
import SearchLocation from './SearchLocation';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';

type Props = {
  handleFindToiletButtonClick: () => void;
};

function FilterPanelNav({ handleFindToiletButtonClick }: Props) {
  const [searchParams] = useSearchParams();
  const { state, dispatchFilters } = useFiltersContext();
  const { isFavouritesSelected, isFacilitiesSelected } = state;

  const onFilterButtonClick = () => {
    dispatchFilters({ type: FiltersActionEnum.FILTER_BUTTON_CLICK });
  };

  const onFavouriteButtonClick = () => {
    dispatchFilters({ type: FiltersActionEnum.FAVOURITES_BUTTON_CLICK });
  };

  return (
    <nav
      id='filter-nav'
      aria-label='filter control panel'
      className=' flex flex-col gap-2 bg-light-panel px-4 pb-4 pt-2 dark:bg-dark-panel md:relative md:flex-grow md:bg-light-panel-secondary md:bg-opacity-95'
    >
      <div className='flex justify-between '>
        <FilterButton
          icon='fa-filter'
          onClick={onFilterButtonClick}
          isSelected={isFacilitiesSelected}
          isActive={searchParams.getAll('filters').length > 0}
        >
          <span className='text-xs'>Filter</span>
        </FilterButton>

        <FilterButton
          icon='fa-star'
          onClick={onFavouriteButtonClick}
          isSelected={isFavouritesSelected}
        >
          <span className='text-xs'>Favourites</span>
        </FilterButton>

        <FilterButton
          icon='fa-magnifying-glass'
          reverseColours
          onClick={handleFindToiletButtonClick}
        >
          <span className='text-xs'>Find a toilet near me</span>
        </FilterButton>
      </div>
      <div className='st flex justify-center md:mr-4 md:justify-start'>
        <SearchLocation />
      </div>
    </nav>
  );
}

export default FilterPanelNav;
