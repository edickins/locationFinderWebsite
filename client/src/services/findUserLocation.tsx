import { Dispatch, SetStateAction } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

type FindLocationError = { messageTitle: string; message: string } | undefined;

type SetFindLocationError = Dispatch<SetStateAction<FindLocationError>>;

// handler for 'Find a toilet near me' button
const findUserLocation = (
  locationBounds: google.maps.LatLngBounds | undefined,
  setSearchParams: SetURLSearchParams,
  setFindLocationError: SetFindLocationError
) => {
  console.log('findUserLocation');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        if (locationBounds?.contains(pos) === false) {
          // pos is outside of the bounds of all the map location Markers
          // display message and relocate to default position

          setFindLocationError({
            messageTitle: 'Geolocation detection',
            message:
              'Sorry, but your location is outside of the area covered by this application.  This means we cannot use your location on the map.'
          });
        } else {
          const searchParams = new URLSearchParams(window.location.search);
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.set('userLocation', JSON.stringify(pos));
          setSearchParams(newSearchParams);
        }
      },
      (error) => {
        // TODO handle any errors
        setFindLocationError({
          messageTitle: 'Geolocation error',
          message: error.message
        });
      }
    );
  } else {
    // TODO handle any errors
    // Browser doesn't support Geolocation
    setFindLocationError({
      messageTitle: 'Geolocation error',
      message: 'Your device does not support geolocation services.'
    });
  }
};

export default findUserLocation;
