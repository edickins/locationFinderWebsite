import { useRef, useState } from 'react';
import SearchLocation from './SearchLocation';
import FindToiletNearMeButton from '../buttons/FindToiletNearMeButton';
import FilterSectionFacilities from './FilterSectionFacilities';
import FilterSectionSearch from './FilterSectionSearch';
import FilterSectionFavourites from './FilterSectionFavourites';
import FilterButton from '../buttons/FilterButton';
import DoneButton from '../buttons/DoneButton';

function FilterPanel() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFacilitiesActive, setIsFacilitiesActive] = useState(false);
  const [isFavouritesActive, setIsFavouritesActive] = useState(false);

  const filtersContainerRef = useRef<HTMLElement | null>(null);

  const showFilterPanel = () => {
    if (isPanelOpen) return;
    if (filtersContainerRef.current) {
      if (filtersContainerRef.current.classList.contains('block')) {
        return;
      }

      filtersContainerRef.current.classList.toggle('hidden');
      filtersContainerRef.current.classList.toggle('block');
      setIsPanelOpen(true);
    }
  };

  const hideFilterPanel = () => {
    if (filtersContainerRef.current) {
      filtersContainerRef.current.classList.toggle('hidden');
      filtersContainerRef.current.classList.toggle('block');
      setIsPanelOpen(false);
      setIsFavouritesActive(false);
      setIsFacilitiesActive(false);
    }
  };

  const handleFilterButtonClick = () => {
    if (filtersContainerRef.current) {
      showFilterPanel();
      setIsFacilitiesActive(true);
      setIsFavouritesActive(false);
    }
  };

  const handleFavouritesButtonClick = () => {
    if (filtersContainerRef.current) {
      showFilterPanel();
      setIsFacilitiesActive(false);
      setIsFavouritesActive(true);
    }
  };

  return (
    <div
      id='filter-container'
      className='absolute left-0 right-0 top-0 bg-dark-panel'
    >
      <nav
        id='filter-nav'
        aria-label='filter controls'
        className=' flex flex-col gap-2  px-4 pb-4 pt-2'
      >
        <div className='flex justify-between'>
          <FilterButton
            icon='fa-filter'
            onClick={handleFilterButtonClick}
            isActive={isFacilitiesActive}
          >
            <span className='text-xs'>Filter</span>
          </FilterButton>
          <FilterButton
            icon='fa-star'
            onClick={handleFavouritesButtonClick}
            isActive={isFavouritesActive}
          >
            <span className='text-xs'>Favourites</span>
          </FilterButton>
          <FindToiletNearMeButton />
        </div>
        <div className='flex justify-center'>
          <SearchLocation />
        </div>
      </nav>

      <section
        id='filters-container'
        ref={filtersContainerRef}
        className='hidden'
      >
        <FilterSectionFacilities
          onClick={handleFilterButtonClick}
          isFacilitiesActive={isFacilitiesActive}
        />
        <FilterSectionFavourites
          isFavouritesActive={isFavouritesActive}
          onClick={handleFavouritesButtonClick}
        />
        <FilterSectionSearch />
      </section>
      <DoneButton isPanelOpen={isPanelOpen} hideFilterPanel={hideFilterPanel} />
    </div>
  );
}

export default FilterPanel;
