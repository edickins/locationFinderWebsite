import { IFacility } from '../../context/toiletContext/types';

type Props = {
  facilities: IFacility[];
};

function DetailPanelFacilities({ facilities }: Props) {
  return (
    <section id='facilties-section' className='mb-4'>
      <h2 className=' text-lg  font-semibold dark:text-dark-primary-color'>
        Facilities at this toilet:
      </h2>
      <ul className='list-none'>
        {facilities.map((facility) => (
          <li key={facility.id} className='ml-4'>
            {facility.full_name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DetailPanelFacilities;
