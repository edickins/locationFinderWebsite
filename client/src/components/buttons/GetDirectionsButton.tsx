import { ILocation } from '../../context/locationContext/types';
import FilterButton from './FilterButton';

type Props = {
  destination: ILocation | undefined;
  originString: string | undefined;
};

function GetDirectionsButton({ destination, originString }: Props) {
  if (!destination || !originString) return null;

  const origin = JSON.parse(originString);

  const address = destination.formatted_address;
  const words = address.split(' ');

  // URL encode each word and join them with a "+"
  const urlEncodedDestination = words
    .map((word) => encodeURIComponent(word))
    .join('+');

  const urlEncodedOriginName = 'Your+location';

  const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.geometry.location.lat},${destination.geometry.location.lng}&origin_place_id=${urlEncodedOriginName}&destination_place_id=${urlEncodedDestination}`;

  const openGoogleMapsDirectionsURL = (): void => {
    window.open(url);
  };

  return (
    <div className='mb-4'>
      <FilterButton
        icon='fa-map-location-dot'
        title='Click me to see this location on the map.'
        onClick={openGoogleMapsDirectionsURL}
        reverseColours={false}
      >
        <div className='ml-2'>
          <p className='text-left text-lg '>
            <span className='hidden text-left dark:text-white md:inline'>
              {' '}
              (get directions)
            </span>
          </p>
          <p className='text-left text-lg dark:text-white md:hidden'>
            {' '}
            (get directions)
          </p>
        </div>
      </FilterButton>
    </div>
  );
}

export default GetDirectionsButton;
