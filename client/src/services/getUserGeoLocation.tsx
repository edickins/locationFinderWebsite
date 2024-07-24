import { Dispatch, SetStateAction } from 'react';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

type FindLocationError = { messageTitle: string; message: string } | undefined;
type SetFindLocationError = Dispatch<SetStateAction<FindLocationError>>;

// handler for 'Find a toilet near me' button
const getUserGeoLocation = (
  locationBounds: google.maps.LatLngBounds | undefined,
  setFindLocationError: SetFindLocationError,
  searchParams: URLSearchParams
): Promise<{ lat: number; lng: number } | undefined> => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          const fakeLocation = searchParams.get('fakeLocation');
          if (fakeLocation) {
            const fakeLocationObj = JSON.parse(fakeLocation);
            if (isLatLngLiteral(fakeLocationObj)) {
              pos = fakeLocationObj;
            }
          }

          if (locationBounds?.contains(pos) === false) {
            setFindLocationError({
              messageTitle: 'Geolocation detection',
              message:
                'Sorry, but your location is outside of the area covered by this application. This means we cannot use your location on the map.'
            });
            resolve(undefined);
          } else {
            resolve(pos);
          }
        },
        (error) => {
          setFindLocationError({
            messageTitle: 'Geolocation error',
            message: `${error.message}\r\n\nYou have denied geolocation access. If you want to use the geolocation features of this website please enable it in your browser settings and try again.
\r\n\nFor Chrome: Go to Settings > Privacy and security > Site settings > Location, and allow location access for this site.
\r\n\nFor Firefox: Go to Preferences > Privacy & Security > Permissions > Location, and allow location access for this site.
\r\n\nFor Edge: Go to Settings > Site permissions > Location, and allow location access for this site.'`
          });
          resolve(undefined);
        }
      );
    } else {
      setFindLocationError({
        messageTitle: 'Geolocation error',
        message: 'Your device does not support geolocation services.'
      });
      resolve(undefined);
    }
  });
};

export default getUserGeoLocation;
