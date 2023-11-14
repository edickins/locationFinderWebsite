import { useSearchParams } from 'react-router-dom';
import FilterButton from '../buttons/FilterButton';
import SearchLocation from './SearchLocation';

type Props = {
  handleFilterButtonClick: () => void;
  handleFavouritesButtonClick: () => void;
  handleFindToiletButtonClick: () => void;
  clearAllSearches: () => void;
  addLocationToResults: (
    matches: RegExpMatchArray | null,
    locationID: string,
    term: string
  ) => void;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
};

function FilterPanelNav({
  handleFilterButtonClick,
  handleFavouritesButtonClick,
  handleFindToiletButtonClick,
  addLocationToResults,
  clearAllSearches,
  isFacilitiesSelected,
  isFavouritesSelected
}: Props) {
  const [searchParams] = useSearchParams();

  return (
    <nav
      id='filter-nav'
      aria-label='filter control panel'
      className=' flex flex-col gap-2  bg-dark-panel px-4 pb-4 pt-2'
    >
      <div className='flex justify-between'>
        <FilterButton
          icon='fa-filter'
          onClick={handleFilterButtonClick}
          isSelected={isFacilitiesSelected}
          isActive={searchParams.getAll('filters').length > 0}
        >
          <span className='text-xs'>Filter</span>
        </FilterButton>

        <FilterButton
          icon='fa-star'
          onClick={handleFavouritesButtonClick}
          isSelected={isFavouritesSelected}
        >
          <span className='text-xs'>Favourites</span>
        </FilterButton>

        <FilterButton
          icon='fa-magnifying-glass'
          onClick={handleFindToiletButtonClick}
        >
          <span className='text-xs'>Find a toilet near me</span>
        </FilterButton>
      </div>
      <div className='flex justify-center'>
        <SearchLocation
          addLocationToResults={addLocationToResults}
          clearAllSearches={clearAllSearches}
        />
      </div>
    </nav>
  );
}

export default FilterPanelNav;
