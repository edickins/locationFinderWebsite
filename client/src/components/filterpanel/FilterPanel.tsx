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

  const [searchTermMatches, setSearchTermMatches] = useState<string[]>([]);
  const [searchTermPerfectMatches, setSearchTermPerfectMatches] = useState<
    string[]
  >([]);

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

  return (
    <div id='filter-panel' className='absolute  left-0 right-0 top-0 '>
      <FilterPanelNav
        handleFavouritesButtonClick={handleFavouritesButtonClick}
        handleFilterButtonClick={handleFilterButtonClick}
        handleFindToiletButtonClick={handleFindToiletButtonClick}
        setSearchTermMatches={setSearchTermMatches}
        setSearchTermPerfectMatches={setSearchTermPerfectMatches}
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
        searchTermMatches={searchTermMatches}
        searchTermPerfectMatches={searchTermPerfectMatches}
        ref={filtersContainerRef}
      />
    </div>
  );
}

export default FilterPanel;
