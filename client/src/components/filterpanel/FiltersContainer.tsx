import { useSearchParams } from 'react-router-dom';
import FilterSectionFacilities from './FilterSectionFacilities';
import FilterSectionFavourites from './FilterSectionFavourites';
import FilterSectionSearch from './FilterSectionSearch';
import DoneButton from '../buttons/DoneButton';
import ClosePanelButton from '../buttons/ClosePanelButton';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';

const FiltersContainer = function FiltersContainer() {
  const [searchParams] = useSearchParams();
  const { state, dispatchFilters } = useFiltersContext();
  const { isPanelOpen } = state;

  const hideFilterPanel = () => {
    dispatchFilters({ type: FiltersActionEnum.HIDE_FILTER_PANEL });
  };

  return (
    <section
      id='filters-container'
      className={` fixed bottom-0 left-0 right-0 top-36 mx-2 my-4 flex  flex-col  bg-light-panel-secondary bg-opacity-95  p-4 dark:bg-dark-panel ${
        isPanelOpen ? 'block' : 'hidden'
      }`}
    >
      <nav aria-label='close panel' className='flex justify-end'>
        <ClosePanelButton
          isPanelOpen={isPanelOpen}
          hideFilterPanel={hideFilterPanel}
        />
      </nav>
      <div className='flex-grow overflow-auto'>
        <FilterSectionFacilities
          isActive={searchParams.getAll('filters').length > 0}
        />
        <FilterSectionFavourites />
        <FilterSectionSearch />
        <DoneButton
          isPanelOpen={isPanelOpen}
          hideFilterPanel={hideFilterPanel}
        />
      </div>
    </section>
  );
};

export default FiltersContainer;
