import { forwardRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSectionFacilities from './FilterSectionFacilities';
import FilterSectionFavourites from './FilterSectionFavourites';
import FilterSectionSearch from './FilterSectionSearch';
import DoneButton from '../buttons/DoneButton';

type Props = {
  filtersContainerRef: React.RefObject<HTMLElement> | null;
  handleFilterButtonClick: () => void;
  handleFavouritesButtonClick: () => void;
  hideFilterPanel: () => void;
  isFacilitiesSelected: boolean;
  isFavouritesSelected: boolean;
  isPanelOpen: boolean;
};

const FiltersContainer = forwardRef(function FiltersContainer({
  filtersContainerRef,
  isFacilitiesSelected,
  isFavouritesSelected,
  isPanelOpen,
  handleFilterButtonClick,
  handleFavouritesButtonClick,
  hideFilterPanel
}: Props) {
  const [searchParams] = useSearchParams();
  return (
    <section
      id='filters-container'
      ref={filtersContainerRef}
      className='fixed bottom-0 left-0 right-0 top-36 hidden bg-dark-panel'
    >
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
