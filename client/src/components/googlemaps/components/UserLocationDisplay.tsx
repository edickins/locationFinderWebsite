import { useSearchParams } from 'react-router-dom';
import { useMapContext } from 'googlemaps-react-primitives';
import { useEffect, useRef, useState } from 'react';
import { userLocationSVG } from './markerSVGs';

function UserLocationDisplay() {
  const infoWindowRef = useRef<google.maps.InfoWindow>();
  const circleRef = useRef<google.maps.Circle>();
  const markerRef = useRef<google.maps.Marker>();
  const { map, addMarker } = useMapContext();
  const [userLocation, setUserLocation] = useState<
    { lat: number; lng: number } | undefined
  >();
  const [searchParams, unused] = useSearchParams();

  useEffect(() => {
    const posString = searchParams.get('userLocation');
    if (posString) {
      const pos = JSON.parse(posString);

      // Check if pos is a valid LatLng object
      if (pos && typeof pos.lat === 'number' && typeof pos.lng === 'number') {
        setUserLocation(pos);
      } else {
        console.error('Invalid userLocation:', pos);
        // TODO handle this error
        // Handle the error...
      }
    }
  }, [searchParams, setUserLocation]);

  useEffect(() => {
    if (userLocation && !infoWindowRef.current && !circleRef.current) {
      infoWindowRef.current = new google.maps.InfoWindow();
      infoWindowRef.current.setPosition(userLocation);
      infoWindowRef.current.setOptions({
        pixelOffset: new google.maps.Size(0, -30)
      });
      const styledContent = `<div style="color:#040404;padding:4px;font-weight:700">You are here</div>`;

      infoWindowRef.current.setContent(styledContent);
      infoWindowRef.current.open(map);
      const latLng = new google.maps.LatLng(userLocation.lat, userLocation.lng);
      map?.panTo(latLng);
      map?.setZoom(15);
      map?.setCenter(userLocation);

      circleRef.current = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.1,
        map,
        center: userLocation,
        radius: 400
      });

      const markerOptions = {
        url: `data:image/svg+xml;base64,${window.btoa(userLocationSVG)}`,
        scaledSize: new google.maps.Size(25, 25)
      };

      markerRef.current = new google.maps.Marker({
        ...{ position: latLng },
        map,
        icon: markerOptions
      });

      addMarker(markerRef.current);
    }

    // cleanup function
    return () => {
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
        infoWindowRef.current = undefined;
      }
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = undefined;
      }
      if (markerRef.current) {
        markerRef.current.setMap(null);
        circleRef.current = undefined;
      }
    };
  }, [addMarker, map, userLocation]);
  return null;
}

export default UserLocationDisplay;
