import { IFacility } from '../../context/locationContext/types';

type Props = {
  facilities: IFacility[];
};

function DetailPanelFacilities({ facilities }: Props) {
  console.log(facilities);
  return (
    <section
      id='facilties-section'
      className='col-span-1 mb-4 md:col-span-2 md:mb-0'
    >
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
