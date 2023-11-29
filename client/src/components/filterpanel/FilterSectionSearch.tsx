import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import SearchResultsList from './SearchResultsList';

function FilterSectionSearch() {
  const { state, dispatchFilters } = useFiltersContext();
  const isSelected = state.isSearchSelected;
  return (
    <section id='results-container' className='px-4 py-2'>
      <h2 className='text-xl font-semibold'>Results</h2>
      {isSelected && <SearchResultsList />}
    </section>
  );
}

export default FilterSectionSearch;
