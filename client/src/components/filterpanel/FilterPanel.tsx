import { useSearchParams } from 'react-router-dom';
import FilterPanelNav from './FilterPanelNav';
import FiltersContainer from './FiltersContainer';

import FindNearestLocationPanel from './FindNearestLocationPanel';

type Props = {
  handleFindNearestLocationClick: () => void;
};

function FilterPanel({ handleFindNearestLocationClick }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filtersParam = searchParams.get('filters');

  const updateSearchParams = (key: string, value: string) => {
    if (!key) return;
    // update the URL with new filters or delete that key if there are no values
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (!value) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div
      id='filter-panel-wrapper'
      className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 mx-auto justify-between md:flex md:max-w-6xl
       '
    >
      <div
        id='filter-panel'
        className='pointer-events-none relative mt-10  md:left-4  md:mt-24 md:max-w-md  '
      >
        <FilterPanelNav
          handleFindNearestLocationClick={handleFindNearestLocationClick}
          filtersParam={filtersParam}
        />
        <FiltersContainer
          filtersParam={filtersParam}
          updateSearchParams={updateSearchParams}
        />
      </div>
      <div
        id='find-nearest-panel'
        className=' pointer-events-none relative mt-10 hidden md:right-4 md:mt-24 md:block'
      >
        <FindNearestLocationPanel
          handleFindNearestLocationClick={handleFindNearestLocationClick}
        />
      </div>
    </div>
  );
}

export default FilterPanel;
