import { useCallback, useEffect, useRef, useState } from 'react';
import { useMapContext } from 'googlemaps-react-primitives';

interface Props extends google.maps.InfoWindowOptions {
  content: string;
  position: google.maps.LatLngLiteral;
  updateSearchParams: (key: string, value: string) => void;
  locationID: string | null;
}

function InfoWindow({
  content,
  position,
  updateSearchParams,
  locationID
}: Props) {
  const infoWindowRef = useRef<google.maps.InfoWindow>();
  const clickListenerRef = useRef<google.maps.MapsEventListener | undefined>();
  const { map } = useMapContext();

  const clearLocationID = useCallback(() => {
    updateSearchParams('locationID', '');
  }, [updateSearchParams]);

  // listen to click events on the infoWindow displayed when a user clicks on it
  useEffect(() => {
    if (!infoWindowRef.current && locationID && content !== '') {
      infoWindowRef.current = new google.maps.InfoWindow({
        content,
        position,
        disableAutoPan: true
      });
      const styledContent = `<div style="color:#040404;padding:4px;font-weight:700">${content}</div>`;
      infoWindowRef.current.setOptions({
        content: styledContent,
        position,
        pixelOffset: new google.maps.Size(0, -30),
        disableAutoPan: true
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
  }, [map, content, position, locationID, clearLocationID]);

  return null;
}

export default InfoWindow;
