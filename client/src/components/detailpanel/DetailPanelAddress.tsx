import { PropsWithChildren } from 'react';
import { ILocation } from '../../context/locationContext/types';
import FavouritesToggle from '../FavouritesToggle';
import CloseDetailPanelButton from '../buttons/CloseDetailPanelButton';

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
}: Props) {
  const regEx = /closed/i;
  const isClosed = item?.open_status.match(regEx);

  return (
    <section id='address-section' className='mb-4 md:col-span-3 md:mb-0'>
      <CloseDetailPanelButton
        hidePanel={hidePanel}
        showPanel={showPanel}
        isPanelOpen={isPanelOpen}
        title='Click me to show/hide the details for this location.'
      >
        <h1 className='mb-2 text-left text-xl font-bold text-light-secondary-color hover:text-light-primary-color hover:underline dark:text-dark-primary-color hover:dark:text-dark-secondary-color'>
          {item?.long_name}
        </h1>
      </CloseDetailPanelButton>
      <FavouritesToggle isFavourite={item?.isFavourite} id={item?.id} />
      {children}
      <p className='font-semibold'>Address: </p>
      <p className='mb-2'>{item?.formatted_address}</p>
      {isClosed && <p>This toilet is currently closed and not in service.</p>}
    </section>
  );
}

export default DetailPanelAddress;
