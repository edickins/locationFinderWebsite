import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';
import FilterButton from '../buttons/FilterButton';
import SearchResultsList from './SearchResultsList';

type Props = {
  updateSearchParams: (key: string, value: string) => void;
};

function FilterSectionSearch({ updateSearchParams }: Props) {
  const { state, dispatchFilters } = useFiltersContext();
  const isSelected = state.isSearchSelected;

  const onClick = () => {
    dispatchFilters({ type: FiltersActionEnum.SEARCH_TERM_CLICK });
  };
  return (
    <section id='results-container' className='py-2 pl-4 pr-1'>
      <FilterButton
        icon='fa-star'
        onClick={onClick}
        isSelected={isSelected}
        title='Click me to view toilets that match the search term you entered above.'
      >
        <span className='text-xl'>Search</span>
      </FilterButton>
      {isSelected && (
        <SearchResultsList updateSearchParams={updateSearchParams} />
      )}
    </section>
  );
}

export default FilterSectionSearch;
