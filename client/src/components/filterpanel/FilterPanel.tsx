import FilterPanelNav from './FilterPanelNav';
import FiltersContainer from './FiltersContainer';

type Props = {
  handleFindToiletButtonClick: () => void;
};

function FilterPanel({ handleFindToiletButtonClick }: Props) {
  return (
    <div id='filter-panel' className='absolute  left-0 right-0 top-0 '>
      <FilterPanelNav
        handleFindToiletButtonClick={handleFindToiletButtonClick}
      />
      <FiltersContainer />
    </div>
  );
}

export default FilterPanel;
