import { useMap } from 'googlemaps-react-primitives';
import { useEffect } from 'react';

type Props = {
  setGoogleMapRef: (map: google.maps.Map) => void;
};

// MapReport solves the problem of getting a reference to the rendered map
// from outside the context of the mapContext.  It uses the setGoogleMapRef
// function to set a useRef in Home.tsx
function MapReporter({ setGoogleMapRef }: Props) {
  const map = useMap();

  useEffect(() => {
    if (map) {
      setGoogleMapRef(map);
    }
  }, [map, setGoogleMapRef]);

  return null;
}

export default MapReporter;
