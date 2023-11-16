import { useState } from 'react';
import FilterPanelNav from './FilterPanelNav';
import FiltersContainer from './FiltersContainer';

type Props = {
  handleFindToiletButtonClick: () => void;
};

function FilterPanel({ handleFindToiletButtonClick }: Props) {
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
        searchTermMatches={searchTermMatches}
        searchTermPerfectMatches={searchTermPerfectMatches}
      />
    </div>
  );
}

export default FilterPanel;
