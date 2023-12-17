import FilterButton from '../buttons/FilterButton';

type Props = {
  handleFindToiletButtonClick: () => void;
};

function FindNearestLocationPanel({ handleFindToiletButtonClick }: Props) {
  return (
    <div className='pointer-events-auto relative bg-light-panel-secondary bg-opacity-95  px-4 py-2 drop-shadow-lg dark:bg-dark-panel md:top-0  md:mx-0 md:mt-0 md:border-2  md:border-gray-700 '>
      <FilterButton
        icon='fa-magnifying-glass'
        reverseColours
        onClick={handleFindToiletButtonClick}
      >
        <span className='text-xs'>Find nearest toilet</span>
      </FilterButton>
    </div>
  );
}

export default FindNearestLocationPanel;
