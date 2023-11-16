import { useSearchParams } from 'react-router-dom';
import FilterSectionFacilities from './FilterSectionFacilities';
import FilterSectionFavourites from './FilterSectionFavourites';
import FilterSectionSearch from './FilterSectionSearch';
import DoneButton from '../buttons/DoneButton';
import ClosePanelButton from '../buttons/ClosePanelButton';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';

type Props = {
  searchTermMatches: string[];
  searchTermPerfectMatches: string[];
};

const FiltersContainer = function FiltersContainer({
  searchTermMatches,
  searchTermPerfectMatches
}: Props) {
  const [searchParams] = useSearchParams();
  const { state, dispatchFilters } = useFiltersContext();
  const { isPanelOpen } = state;

  const hideFilterPanel = () => {
    dispatchFilters({ type: FiltersActionEnum.HIDE_FILTER_PANEL });
  };

  return (
    <section
      id='filters-container'
      className={`fixed bottom-0 left-0 right-0 top-36  m-4 bg-dark-panel  bg-opacity-95 p-4 ${
        isPanelOpen ? 'block' : 'hidden'
      }`}
    >
      <nav aria-label='close panel' className='flex justify-end'>
        <ClosePanelButton
          isPanelOpen={isPanelOpen}
          hideFilterPanel={hideFilterPanel}
        />
      </nav>
      <FilterSectionFacilities
        isActive={searchParams.getAll('filters').length > 0}
      />
      <FilterSectionFavourites />
      <FilterSectionSearch
        searchTermMatches={searchTermMatches}
        searchTermPerfectMatches={searchTermPerfectMatches}
      />
      <DoneButton isPanelOpen={isPanelOpen} hideFilterPanel={hideFilterPanel} />
    </section>
  );
};

export default FiltersContainer;
