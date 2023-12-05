import { PropsWithChildren } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ILocation } from '../../context/locationContext/types';
import FilterButton from '../buttons/FilterButton';

interface Props extends PropsWithChildren<JSX.Element> {
  item: ILocation | undefined;
  scrollToTop?: () => void;
}

function DetailPanelShowLocationButton({ item, scrollToTop, children }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!item) return null;

  const onNearestAlternativeClick = () => {
    // Create a new URLSearchParams instance to clone the current parameters
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Set the new locationID parameter
    newSearchParams.set('locationID', item.id);

    // Replace the search parameters - this will be picked up in Home
    setSearchParams(newSearchParams);

    if (scrollToTop) {
      scrollToTop();
    }
  };

  return (
    <section
      id='nearest-alternative-section'
      className=' col-span-1 md:col-span-3 md:mb-0 md:self-end'
    >
      <h1 className='mb-4 text-lg font-bold  md:mb-0'>
        {children}

        <FilterButton
          icon='fa-map-location-dot'
          onClick={onNearestAlternativeClick}
          reverseColours
        >
          <div className='ml-2'>
            <p className='text-left text-xs '>
              {`${item.long_name}`}
              <span className='hidden text-left text-xs md:inline'>
                {' '}
                (click to see on map)
              </span>
            </p>
            <p className='text-left text-xs md:hidden'>
              {' '}
              (click to see on map)
            </p>
          </div>
        </FilterButton>
      </h1>
    </section>
  );
}

DetailPanelShowLocationButton.defaultProps = {
  scrollToTop: () => {}
};

export default DetailPanelShowLocationButton;
