import { ILocation } from '../context/locationContext/types';
import { prefixHash } from '../utils/simpleHash';

interface Props {
  location: ILocation;
  mtValue: number;
}

function Location({ location, mtValue }: Props) {
  return (
    <>
      <h3
        className={`mt-${mtValue} text-xl font-bold text-light-secondary-color dark:text-dark-secondary-color`}
      >
        {location.long_name}
      </h3>
      <p>{location.formatted_address}</p>
      <h4 className='mt-4 text-lg text-light-secondary-color dark:text-dark-secondary-color'>
        Facilities at this location
      </h4>
      <ul>
        {location.facilities.map((facility) => {
          return (
            <li key={`${location.id}${facility.short_name}`}>
              {facility.full_name}
            </li>
          );
        })}
      </ul>
      <p className='mt-4 text-lg text-light-secondary-color dark:text-dark-secondary-color'>
        opening hours
      </p>
      <ul className='mt-2'>
        {location.opening_hours.map((hours) => {
          const key = prefixHash(location.id, hours);
          return <li key={key}>{hours}</li>;
        })}
      </ul>
    </>
  );
}

export default Location;
