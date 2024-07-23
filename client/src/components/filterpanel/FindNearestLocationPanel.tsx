import FilterButton from '../buttons/IconButton';

type Props = {
  handleFindNearestLocationClick: () => void;
};

function FindNearestLocationPanel({ handleFindNearestLocationClick }: Props) {
  return (
    <div className='pointer-events-auto relative bg-light-panel-secondary bg-opacity-95  px-4 py-2 drop-shadow-lg dark:bg-dark-panel md:top-0  md:mx-0 md:mt-0 md:border-2  md:border-light-secondary-color'>
      <FilterButton
        icon='fa-magnifying-glass'
        onClick={handleFindNearestLocationClick}
        title='Click me to find the nearest toilet to your current location'
      >
        <span className='text-xs'>Find nearest toilet</span>
      </FilterButton>
    </div>
  );
}

export default FindNearestLocationPanel;
