import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';
import FilterButton from '../buttons/FilterButton';
import SearchResultsList from './SearchResultsList';

function FilterSectionSearch() {
  const { state, dispatchFilters } = useFiltersContext();
  const isSelected = state.isSearchSelected;

  const onClick = () => {
    dispatchFilters({ type: FiltersActionEnum.SEARCH_TERM_CHANGE });
  };
  return (
    <section id='results-container' className='px-4 py-2'>
      <FilterButton icon='fa-star' onClick={onClick} isSelected={isSelected}>
        <span className='text-xl'>Search</span>
      </FilterButton>
      {isSelected && <SearchResultsList />}
    </section>
  );
}

export default FilterSectionSearch;
