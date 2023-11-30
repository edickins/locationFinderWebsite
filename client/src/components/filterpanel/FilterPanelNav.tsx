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
      className='pointer-events-auto  flex flex-col gap-1 bg-light-panel px-2 pb-2 pt-2 dark:bg-dark-panel md:relative md:dark:bg-dark-panel md:flex-grow md:gap-2 md:bg-light-panel-secondary md:bg-opacity-95 md:px-4 md:pb-4 '
    >
      <div className='flex justify-between md:hidden'>
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
          <span className='text-xs'>Find nearest toilet</span>
        </FilterButton>
      </div>

      <SearchLocation />
    </nav>
  );
}

export default FilterPanelNav;
