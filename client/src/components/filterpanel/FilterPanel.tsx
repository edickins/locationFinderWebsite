import { useRef, useState } from 'react';
import FilterPanelNav from './FilterPanelNav';
import FiltersContainer from './FiltersContainer';

type Props = {
  handleFindToiletButtonClick: () => void;
};

function FilterPanel({ handleFindToiletButtonClick }: Props) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFacilitiesSelected, setIsFacilitiesActive] = useState(false);
  const [isFavouritesSelected, setIsFavouritesActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const matchesRef = useRef<Set<string>>(new Set());
  const perfectMatchesRef = useRef<Set<string>>(new Set());

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
      setIsSearchActive(false);
    }
  };

  const handleFilterButtonClick = () => {
    if (filtersContainerRef.current) {
      showFilterPanel();
      setIsFacilitiesActive(true);
      setIsFavouritesActive(false);
      setIsSearchActive(false);
    }
  };

  const handleFavouritesButtonClick = () => {
    if (filtersContainerRef.current) {
      showFilterPanel();
      setIsFacilitiesActive(false);
      setIsFavouritesActive(true);
      setIsSearchActive(false);
    }
  };

  const handleSearchPanelOnChange = () => {
    if (filtersContainerRef.current) {
      showFilterPanel();
      setIsFacilitiesActive(false);
      setIsFavouritesActive(false);
      setIsSearchActive(true);
    }
  };

  const addLocationToResults = (
    matches: RegExpMatchArray | null,
    locationID: string,
    term: string
  ): void => {
    if (matches !== null) {
      matchesRef.current?.add(locationID);
    }

    matches?.forEach((match) => {
      if (match === term) {
        perfectMatchesRef.current?.add(locationID);
      }
    });

    console.log(`matches ${Array.from(matchesRef.current)}`);
    console.log(`perfect matches ${Array.from(perfectMatchesRef.current)}`);
  };

  const clearAllSearches = () => {
    matchesRef.current.clear();
    perfectMatchesRef.current.clear();
  };

  return (
    <div id='filter-panel' className='absolute  left-0 right-0 top-0 '>
      <FilterPanelNav
        handleFavouritesButtonClick={handleFavouritesButtonClick}
        handleFilterButtonClick={handleFilterButtonClick}
        handleFindToiletButtonClick={handleFindToiletButtonClick}
        addLocationToResults={addLocationToResults}
        clearAllSearches={clearAllSearches}
        isFacilitiesSelected={isFacilitiesSelected}
        isFavouritesSelected={isFavouritesSelected}
      />
      <FiltersContainer
        isFacilitiesSelected={isFacilitiesSelected}
        isFavouritesSelected={isFavouritesSelected}
        isSearchActive={isSearchActive}
        isPanelOpen={isPanelOpen}
        handleFilterButtonClick={handleFilterButtonClick}
        handleFavouritesButtonClick={handleFavouritesButtonClick}
        hideFilterPanel={hideFilterPanel}
        ref={filtersContainerRef}
      />
    </div>
  );
}

export default FilterPanel;
