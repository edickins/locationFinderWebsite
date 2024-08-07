import { usePanelStateContext } from '../../context/panelStateContext/panelStateContext';
import { PanelsActionEnum } from '../../reducer/filtersReducer/types';
import FilterButton from '../buttons/IconButton';
import SearchResultsList from './SearchResultsList';

type Props = {
  updateSearchParams: (key: string, value: string) => void;
};

function FilterSectionSearch({ updateSearchParams }: Props) {
  const { panelsState, dispatchFilters } = usePanelStateContext();
  const isSelected = panelsState.isSearchSelected;

  const onClick = () => {
    dispatchFilters({ type: PanelsActionEnum.SEARCH_TERM_CLICK });
  };
  return (
    <section id='results-container' className='py-2 pl-4 pr-1'>
      <FilterButton
        icon='fa-star'
        onClick={onClick}
        isSelected={isSelected}
        title='Click to view toilets that match the search term you entered above.'
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
