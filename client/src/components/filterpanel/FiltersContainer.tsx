import { forwardRef, ForwardedRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSectionFacilities from './FilterSectionFacilities';
import FilterSectionFavourites from './FilterSectionFavourites';
import FilterSectionSearch from './FilterSectionSearch';
import DoneButton from '../buttons/DoneButton';
import ClosePanelButton from '../buttons/ClosePanelButton';

type Props = {
  handleFilterButtonClick: () => void;
  handleFavouritesButtonClick: () => void;
  hideFilterPanel: () => void;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
  isPanelOpen: boolean;
};

const FiltersContainer = forwardRef(function FiltersContainer(
  {
    isFacilitiesSelected,
    isFavouritesSelected,
    isPanelOpen,
    handleFilterButtonClick,
    handleFavouritesButtonClick,
    hideFilterPanel
  }: Props,
  filtersContainerRef: ForwardedRef<HTMLElement> | null
) {
  const [searchParams] = useSearchParams();
  return (
    <section
      id='filters-container'
      ref={filtersContainerRef}
      className='fixed bottom-0 left-0 right-0 top-36  m-4 hidden bg-dark-panel  bg-opacity-95 p-4'
    >
      <nav aria-label='close panel' className='flex justify-end'>
        <ClosePanelButton
          isPanelOpen={isPanelOpen}
          hideFilterPanel={hideFilterPanel}
        />
      </nav>
      <FilterSectionFacilities
        onClick={handleFilterButtonClick}
        isFacilitiesSelected={isFacilitiesSelected}
        isActive={searchParams.getAll('filters').length > 0}
      />
      <FilterSectionFavourites
        isFavouritesActive={isFavouritesSelected}
        onClick={handleFavouritesButtonClick}
      />
      <FilterSectionSearch />
      <DoneButton isPanelOpen={isPanelOpen} hideFilterPanel={hideFilterPanel} />
    </section>
  );
});

export default FiltersContainer;
