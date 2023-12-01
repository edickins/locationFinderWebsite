import { ILocation } from '../../context/locationContext/types';

type Props = {
  item: ILocation | undefined;
};

function DetailPanelAddress({ item }: Props) {
  return (
    <section id='address-section' className='mb-4 md:col-span-3'>
      <h1 className='mb-4 text-xl font-bold dark:text-dark-primary-color'>
        {item?.long_name}
      </h1>
      <p className='font-semibold'>Address: </p>
      <p className='mb-2'>{item?.formatted_address}</p>
      <p>
        This toilet is currently {item?.open_status} to the public. Please check
        daily opening times to see if it is currently available.
      </p>
    </section>
  );
}

export default DetailPanelAddress;
