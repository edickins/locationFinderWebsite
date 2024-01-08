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
      className='pointer-events-auto  flex flex-col gap-1 bg-light-panel  pb-2 pt-2 dark:bg-dark-panel md:relative md:flex-shrink  md:gap-2 md:border-l-2 md:border-r-2 md:border-t-2 md:border-gray-700 md:bg-light-panel-secondary md:bg-opacity-95 md:px-4 md:pb-0 md:pt-4  md:dark:bg-dark-panel'
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
