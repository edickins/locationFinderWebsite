import { PropsWithChildren, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ILocation } from '../../context/locationContext/types';
import FavouritesToggle from '../FavouritesToggle';
import CloseDetailPanelButton from '../buttons/CloseDetailPanelButton';
import GetDirectionsButton from '../buttons/GetDirectionsButton';

interface Props extends PropsWithChildren<JSX.Element> {
  item: ILocation | undefined;
  hidePanel: () => void;
  showPanel: () => void;
  isPanelOpen: boolean;
}

function DetailPanelAddress({
  item,
  children,
  hidePanel,
  showPanel,
  isPanelOpen
}: Props): JSX.Element {
  const regEx = /closed/i;
  const isClosed = item?.open_status.match(regEx);
  const [searchParams] = useSearchParams();
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    const posString = searchParams.get('userLocation');
    if (posString) {
      const pos = JSON.parse(posString);

      // Check if pos is a valid LatLng object
      if (pos && typeof pos.lat === 'number' && typeof pos.lng === 'number') {
        setUserLocation(posString);
      } else {
        setUserLocation('');
      }
    }
  }, [searchParams, setUserLocation]);

  return (
    <section id='address-section' className='mb-4 md:col-span-3 md:mb-0'>
      <CloseDetailPanelButton
        hidePanel={hidePanel}
        showPanel={showPanel}
        isPanelOpen={isPanelOpen}
        title='Click me to show/hide the details for this location.'
      >
        <h1 className='text-left text-xl font-bold text-light-secondary-color hover:text-light-primary-color hover:underline dark:text-dark-primary-color hover:dark:text-dark-secondary-color'>
          {item?.long_name}
        </h1>
      </CloseDetailPanelButton>
      {userLocation && item && (
        <GetDirectionsButton destination={item} originString={userLocation} />
      )}
      <FavouritesToggle isFavourite={item?.isFavourite} id={item?.id} />
      {children}
      <p className='font-semibold'>Address: </p>
      <p className='mb-2'>{item?.formatted_address}</p>
      {isClosed && <p>This toilet is currently closed and not in service.</p>}
    </section>
  );
}

export default DetailPanelAddress;
