import { useSearchParams } from 'react-router-dom';
import { ILocation } from '../../context/locationContext/types';
import FilterButton from '../buttons/FilterButton';

type Props = {
  item: ILocation | undefined;
};

function DetailPanelNearestAlternative({ item }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!item) return null;

  const onNearestAlternativeClick = () => {
    // Create a new URLSearchParams instance to clone the current parameters
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Set the new locationID parameter
    newSearchParams.set('locationID', item.id);

    // Replace the search parameters - this will be picked up in Home
    setSearchParams(newSearchParams);
  };

  return (
    <section
      id='nearest-alternative-section'
      className=' col-span-1 md:col-span-3 md:mb-0 md:self-end'
    >
      <h1 className='mb-4 text-lg font-bold md:mb-0 md:mb-0'>
        <p className='font-semibold'>Nearest alternative: </p>

        <FilterButton
          icon='fa-map-location-dot'
          onClick={onNearestAlternativeClick}
          reverseColours
        >
          <div className='ml-2'>
            <p className='text-left text-xs '>{`${item.long_name}`}</p>
            <p className='text-left text-xs '>(click to see on map)</p>
          </div>
        </FilterButton>
      </h1>
    </section>
  );
}

export default DetailPanelNearestAlternative;
