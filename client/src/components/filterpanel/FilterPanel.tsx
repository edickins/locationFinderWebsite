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
    <div id='filter-panel' className='absolute  left-0 right-0 top-0 '>
      <FilterPanelNav
        handleFavouritesButtonClick={handleFavouritesButtonClick}
        handleFilterButtonClick={handleFilterButtonClick}
        handleFindToiletButtonClick={handleFindToiletButtonClick}
        isFacilitiesSelected={isFacilitiesSelected}
        isFavouritesSelected={isFavouritesSelected}
      />
      <FiltersContainer
        isFacilitiesSelected={isFacilitiesSelected}
        isFavouritesSelected={isFavouritesSelected}
        isPanelOpen={isPanelOpen}
        handleFilterButtonClick={handleFilterButtonClick}
        handleFavouritesButtonClick={handleFavouritesButtonClick}
        hideFilterPanel={hideFilterPanel}
        filtersContainerRef={filtersContainerRef}
      />
    </div>
  );
}

export default FilterPanel;
