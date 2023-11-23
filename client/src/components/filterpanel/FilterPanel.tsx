import FilterPanelNav from './FilterPanelNav';
import FiltersContainer from './FiltersContainer';

type Props = {
  handleFindToiletButtonClick: () => void;
};

function FilterPanel({ handleFindToiletButtonClick }: Props) {
  return (
    <div
      id='filter-panel'
      className='absolute  left-0 right-0 top-0 md:left-32 md:top-8 md:w-4/12 '
    >
      <div>
        <FilterPanelNav
          handleFindToiletButtonClick={handleFindToiletButtonClick}
        />
        <FiltersContainer />
      </div>
    </div>
  );
}

export default FilterPanel;
