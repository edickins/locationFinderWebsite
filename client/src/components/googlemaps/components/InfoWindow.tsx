import { useEffect, useRef } from 'react';
import { useMapContext } from 'googlemaps-react-primitives';
import { useSearchParams } from 'react-router-dom';

interface Props extends google.maps.InfoWindowOptions {
  content: string;
  position: google.maps.LatLngLiteral;
  // setShowPanel: (show: boolean) => void;
}

function InfoWindow({ content, position }: Props) {
  const infoWindowRef = useRef<google.maps.InfoWindow>();
  const clickListenerRef = useRef<google.maps.MapsEventListener | undefined>();
  const { map } = useMapContext();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    function clearLocationID() {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      // delete the locationID searchParam
      newSearchParams.delete('locationID');
      // Replace the search parameters - this will be picked up in MyMap and Home
      setSearchParams(newSearchParams);
    }
    const locationID = searchParams.get('locationID');

    if (!infoWindowRef.current && locationID) {
      infoWindowRef.current = new google.maps.InfoWindow({ content, position });
      const styledContent = `<div style="color:#040404;padding:4px;font-weight:700">${content}</div>`;
      infoWindowRef.current.setOptions({
        content: styledContent,
        position,
        pixelOffset: new google.maps.Size(0, -30)
      });
      infoWindowRef.current.open(map);

      clickListenerRef.current = google.maps.event.addListener(
        infoWindowRef.current,
        'closeclick',
        () => {
          clearLocationID();
        }
      );
    }

    // cleanup function
    return () => {
      if (infoWindowRef.current) {
        if (clickListenerRef.current) {
          google.maps.event.removeListener(clickListenerRef.current);
        }
        infoWindowRef.current.close();
        infoWindowRef.current = undefined;
      }
    };
  }, [map, content, position, setSearchParams, searchParams]);

  return null;
}

export default InfoWindow;
