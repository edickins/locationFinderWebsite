import { useRef, useState } from 'react';
import FilterPanelNav from './FilterPanelNav';
import FiltersContainer from './FiltersContainer';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';

type Props = {
  handleFindToiletButtonClick: () => void;
};

function FilterPanel({ handleFindToiletButtonClick }: Props) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFacilitiesSelected, setIsFacilitiesActive] = useState(false);
  const [isFavouritesSelected, setIsFavouritesActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [searchTermMatches, setSearchTermMatches] = useState<string[]>([]);
  const [searchTermPerfectMatches, setSearchTermPerfectMatches] = useState<
    string[]
  >([]);

  return (
    <div id='filter-panel' className='absolute  left-0 right-0 top-0 '>
      <FilterPanelNav
        handleFindToiletButtonClick={handleFindToiletButtonClick}
        setSearchTermMatches={setSearchTermMatches}
        setSearchTermPerfectMatches={setSearchTermPerfectMatches}
      />
      <FiltersContainer
        isSearchActive={isSearchActive}
        searchTermMatches={searchTermMatches}
        searchTermPerfectMatches={searchTermPerfectMatches}
      />
    </div>
  );
}

export default FilterPanel;
