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
      className={`pointer-events-auto fixed bottom-4 left-0 right-0 top-32 mx-4 flex flex-col bg-light-panel-secondary bg-opacity-95 p-4 drop-shadow-lg  dark:bg-dark-panel md:relative md:top-0  md:mx-0 md:mt-0 md:max-h-[calc(100%-300px)] md:scroll-auto  md:border-b-2 md:border-l-2 md:border-r-2  md:border-gray-700 md:pt-4 ${
        isPanelOpen ? 'block' : 'hidden md:block'
      }`}
    >
      <nav aria-label='close panel' className='flex justify-end pr-4'>
        <ClosePanelButton isPanelOpen={isPanelOpen} onClick={hideFilterPanel} />
      </nav>
      <div className='mt-2 flex-grow overflow-auto'>
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
