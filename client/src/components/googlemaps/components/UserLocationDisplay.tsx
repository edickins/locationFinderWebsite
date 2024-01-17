import { useSearchParams } from 'react-router-dom';
import { useMapContext } from 'googlemaps-react-primitives';
import { useEffect, useRef } from 'react';
import { userLocationSVG } from './markerSVGs';
import useGetScreensize, { ScreenSizeEnum } from '../../../hooks/getScreensize';

type Props = {
  findNearestLocation: (loc: { lat: number; lng: number }) => void;
};

function UserLocationDisplay({ findNearestLocation }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams] = useSearchParams();
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const screenSize = useGetScreensize();

  const { map, addMarker } = useMapContext();

  useEffect(() => {
    const posString = searchParams.get('userLocation');
    if (posString) {
      const pos = JSON.parse(posString);

      // Check if pos is a valid LatLng object
      if (pos && typeof pos.lat === 'number' && typeof pos.lng === 'number') {
        findNearestLocation(pos);
      } else {
        console.error('Invalid userLocation:', pos);
        // TODO handle this error
        // Handle the error...
      }
    }
  }, [findNearestLocation, searchParams]);

  useEffect(() => {
    const posString = searchParams.get('userLocation');
    if (posString) {
      const userLocation = JSON.parse(posString);
      if (
        userLocation &&
        !infoWindowRef.current &&
        !circleRef.current &&
        !markerRef.current
      ) {
        let zoomLevel = 17;
        switch (screenSize) {
          case ScreenSizeEnum.SM:
          case ScreenSizeEnum.XS: {
            zoomLevel = 16;
            break;
          }
          default:
            zoomLevel = 17;
        }

        const infoW = new google.maps.InfoWindow();
        infoW.setPosition(userLocation);
        infoW.setOptions({
          pixelOffset: new google.maps.Size(0, -30)
        });
        const styledContent = `<div style="color:#040404;padding:4px;font-weight:700">You are here</div>`;

        infoW.setContent(styledContent);
        infoW.open(map);
        const latLng = new google.maps.LatLng(
          userLocation.lat,
          userLocation.lng
        );
        map?.panTo(latLng);
        map?.setZoom(zoomLevel);
        map?.setCenter(userLocation);

        const c = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.1,
          map,
          center: userLocation,
          radius: 150
        });

        const markerOptions = {
          url: `data:image/svg+xml;base64,${window.btoa(userLocationSVG)}`,
          scaledSize: new google.maps.Size(25, 25)
        };

        const m = new google.maps.Marker({
          ...{ position: latLng },
          map,
          icon: markerOptions
        });

        addMarker(m);

        infoWindowRef.current = infoW;
        circleRef.current = c;
        markerRef.current = m;
      }
    }
    // cleanup function
    return () => {
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
        infoWindowRef.current = null;
      }
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    };
  }, [addMarker, findNearestLocation, map, screenSize, searchParams]);
  return null;
}

export default UserLocationDisplay;
