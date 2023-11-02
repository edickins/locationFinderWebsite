import { IToilet } from '../../context/toiletContext/types';
import { prefixHash } from '../../utils/simpleHash';

type Props = {
  item: IToilet;
  nearestAlternativeItem: IToilet | undefined;
};

function DetailPanel({ item, nearestAlternativeItem }: Props) {
  const facilitiesEls = item.facilities.map((facility) => (
    <li key={facility.id} className='ml-4'>
      {facility.full_name}
    </li>
  ));

  const openingHoursEls = item.opening_hours.map((hours) => {
    const key = prefixHash(item.id, hours);
    return <li key={key}>{hours}</li>;
  });

  console.log(item.date_modified);

  const modifiedDate = new Date(item.date_modified!);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const formatedModifiedDate = new Intl.DateTimeFormat('en-US', options).format(
    modifiedDate
  );

  return (
    <div className='sm::grid-cols-1 absolute top-1/2 grid  h-1/2 w-full auto-rows-min gap-4 bg-dark-panel p-8 md:grid-cols-3 md:p-12 '>
      <h1 className='text-xl font-bold dark:text-dark-primary-color'>
        {item.long_name}
      </h1>
      <p>Address: {item.formatted_address}</p>
      <p>
        This toilet is currently {item.open_status}. Please check daily opening
        times.
      </p>
      <section>
        <h2 className=' text-lg font-medium dark:text-dark-primary-color'>
          Facilities at this toilet:
        </h2>
        <ul className='list-none'>{facilitiesEls}</ul>
      </section>
      <section>
        <h2 className='dark:text-dark-primary-color'>Opening hours:</h2>
        <ul>{openingHoursEls}</ul>
      </section>
      <p className='text-xs dark:text-dark-secondary-color'>
        This information was last modified on {formatedModifiedDate}
      </p>
    </div>
  );
}

export default DetailPanel;
