import { useSearchParams } from 'react-router-dom';
import FilterButton from '../buttons/FilterButton';
import SearchLocation from './SearchLocation';

type Props = {
  handleFilterButtonClick: () => void;
  handleFavouritesButtonClick: () => void;
  handleFindToiletButtonClick: () => void;
  handleSearchPanelOnChange: () => void;
  setSearchTermMatches: (matches: string[]) => void;
  setSearchTermPerfectMatches: (matches: string[]) => void;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
};

function FilterPanelNav({
  handleFilterButtonClick,
  handleFavouritesButtonClick,
  handleFindToiletButtonClick,
  handleSearchPanelOnChange,
  setSearchTermMatches,
  setSearchTermPerfectMatches,
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
          setSearchTermMatches={setSearchTermMatches}
          setSearchTermPerfectMatches={setSearchTermPerfectMatches}
          handleSearchPanelOnChange={handleSearchPanelOnChange}
        />
      </div>
    </nav>
  );
}

export default FilterPanelNav;
