import { ILocation } from '../context/locationContext/types';
import { prefixHash } from '../utils/simpleHash';

interface Props {
  location: ILocation;
}

function Location({ location }: Props) {
  return (
    <>
      <h3>{location.long_name}</h3>
      <p>{location.formatted_address}</p>
      <p>facilities</p>
      <ul>
        {location.facilities.map((facility) => {
          return (
            <li key={`${location.id}${facility.short_name}`}>
              {facility.full_name}
            </li>
          );
        })}
      </ul>
      <p>opening hours</p>
      <ul>
        {location.opening_hours.map((hours) => {
          const key = prefixHash(location.id, hours);
          return <li key={key}>{hours}</li>;
        })}
      </ul>
    </>
  );
}

export default Location;
