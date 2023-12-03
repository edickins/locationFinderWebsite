import { PropsWithChildren } from 'react';
import { ILocation } from '../../context/locationContext/types';

interface Props extends PropsWithChildren<JSX.Element> {
  item: ILocation | undefined;
}

function DetailPanelAddress({ item, children }: Props) {
  const regEx = /closed/i;
  const isClosed = item?.open_status.match(regEx);

  return (
    <section id='address-section' className='mb-4 md:col-span-3 md:mb-0'>
      <h1 className='mb-4 text-xl font-bold dark:text-dark-primary-color'>
        {item?.long_name}
      </h1>
      {children}
      <p className='font-semibold'>Address: </p>
      <p className='mb-2'>{item?.formatted_address}</p>
      {isClosed && <p>This toilet is currently closed and not in service.</p>}
    </section>
  );
}

export default DetailPanelAddress;
