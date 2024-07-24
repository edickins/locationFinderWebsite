import { useMapContext } from 'googlemaps-react-primitives';
import { useEffect, useRef } from 'react';
import { userLocationSVG } from './markerSVGs';
import useGetScreensize, { ScreenSizeEnum } from '../../../hooks/getScreensize';

type Props = {
  userLocation: string | null;
  locationID: string | null;
};

function UserLocationDisplay({ userLocation, locationID }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const screenSize = useGetScreensize();

  const { map, addMarker } = useMapContext();

  useEffect(() => {
    if (userLocation) {
      const userLocationObj = JSON.parse(userLocation);
      if (
        userLocationObj &&
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

        const infoW = new google.maps.InfoWindow({ disableAutoPan: true });
        infoW.setPosition(userLocationObj);
        infoW.setOptions({
          pixelOffset: new google.maps.Size(0, -30)
        });
        const styledContent = `<style>
        .gm-style-iw button[aria-label='Close'] {
          height: 20px !important;
          width: 20px !important;
          margin-right: -10px !important;
          margin-top: 5px !important;
        }
        .gm-style-iw button[aria-label='Close'] span {
          margin: 0 !important;
          width: 20px !important;
          height: 20px !important;

        }
      </style><div style="color:#040404;padding:4px;font-weight:700">You are here</div>`;

        infoW.setContent(styledContent);
        infoW.open(map);
        const latLng = new google.maps.LatLng(
          userLocationObj.lat,
          userLocationObj.lng
        );

        // only zoom to location if user location has not been displayed
        if (map && !locationID) {
          map.panTo(latLng);
          map.setZoom(zoomLevel);
          map.setCenter(userLocationObj);
        }

        const c = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.1,
          map,
          center: userLocationObj,
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

        // addMarker(m);

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
  }, [addMarker, locationID, map, screenSize, userLocation]);
  return null;
}

export default UserLocationDisplay;
