import { useRef, useState } from 'react';
import { useToiletsContext } from '../../context/toiletContext/toiletsContext';
import SearchLocation from './SearchLocation';
import FilterButton from '../buttons/FilterButton';
import FindToiletNearMeButton from '../buttons/FindToiletNearMeButton';
import FilterSectionFacilities from './FilterSectionFacilities';
import FilterSectionSearch from './FilterSectionSearch';
import FilterSectionFavourites from './FilterSectionFavourites';
import FavouritesButton from '../buttons/FavouritesButton';
import DoneButton from '../buttons/DoneButton';

function FilterPanel() {
  const { facilities } = useToiletsContext();
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
    console.log(filtersContainerRef.current);
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
            onClick={handleFilterButtonClick}
            isFilterActive={isFacilitiesActive}
          />
          <FavouritesButton
            onClick={handleFavouritesButtonClick}
            isFavouritesActive={isFavouritesActive}
          />
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
          facilities={facilities}
          onClick={handleFilterButtonClick}
          isFacilitiesActive={isFacilitiesActive}
          setIsFacilitiesActive={setIsFacilitiesActive}
        />
        <FilterSectionFavourites isFavouritesActive={isFavouritesActive} />
        <FilterSectionSearch />
      </section>
      <DoneButton isPanelOpen={isPanelOpen} hideFilterPanel={hideFilterPanel} />
    </div>
  );
}

export default FilterPanel;
