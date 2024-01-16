import { useCallback, useEffect, useRef, useState } from 'react';
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
  const searchParamsRef = useRef(searchParams);
  const setSearchParamsRef = useRef(setSearchParams);
  const [locationID, setLocationID] = useState<string | null>(
    searchParams.get('locationID')
  );

  // store references to searchParams to stop re-renders caused by params other than locationID changing.
  useEffect(() => {
    searchParamsRef.current = searchParams;
    setSearchParamsRef.current = setSearchParams;
  }, [searchParams, setSearchParams]);

  // prevent re-renders from other searchParam values (like search) changing
  // by only responding to locationID changing.

  useEffect(() => {
    const newLocationID = searchParams.get('locationID');
    if (newLocationID !== locationID) {
      setLocationID(newLocationID);
    }
  }, [locationID, searchParams]);

  const clearLocationID = useCallback(() => {
    const newSearchParams = new URLSearchParams(
      searchParamsRef.current.toString()
    );
    newSearchParams.delete('locationID');
    setSearchParamsRef.current(newSearchParams);
  }, []);

  // listen to click events on the infoWindow displayed when a user clicks on it
  useEffect(() => {
    if (!infoWindowRef.current && locationID && content !== '') {
      infoWindowRef.current = new google.maps.InfoWindow({ content, position });
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
