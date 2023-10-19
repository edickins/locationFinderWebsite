import { IToilet } from '../context/toiletContext/types';
import { prefixHash } from '../utils/simpleHash';

interface ToiletProps {
  toilet: IToilet;
}

function Toilet({ toilet }: ToiletProps) {
  return (
    <>
      <h3>{toilet.long_name}</h3>
      <p>{toilet.formatted_address}</p>
      <p>facilities</p>
      <ul>
        {toilet.facilities.map((facility) => {
          return (
            <li key={`${toilet.id}${facility.short_name}`}>
              {facility.full_name}
            </li>
          );
        })}
      </ul>
      <p>opening hours</p>
      <ul>
        {toilet.opening_hours.map((hours) => {
          const key = prefixHash(toilet.id, hours);
          return <li key={key}>{hours}</li>;
        })}
      </ul>
    </>
  );
}

export default Toilet;