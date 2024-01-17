import FilterPanelNav from './FilterPanelNav';
import FiltersContainer from './FiltersContainer';

import FindNearestLocationPanel from './FindNearestLocationPanel';

type Props = {
  handleFindLocationButtonClick: () => void;
};

function FilterPanel({ handleFindLocationButtonClick }: Props) {
  return (
    <div
      id='filter-panel-wrapper'
      className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 mx-auto justify-between md:flex md:max-w-6xl
       '
    >
      <div
        id='filter-panel'
        className='pointer-events-none relative mt-10 shadow-lg md:left-4  md:mt-24 md:max-w-md  '
      >
        <FilterPanelNav
          handleFindLocationButtonClick={handleFindLocationButtonClick}
        />
        <FiltersContainer />
      </div>
      <div
        id='find-nearest-panel'
        className=' pointer-events-none relative mt-10 hidden md:right-4 md:mt-24 md:block'
      >
        <FindNearestLocationPanel
          handleFindLocationButtonClick={handleFindLocationButtonClick}
        />
      </div>
    </div>
  );
}

export default FilterPanel;
