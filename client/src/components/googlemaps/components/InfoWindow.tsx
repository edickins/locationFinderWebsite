import { useEffect, useRef } from 'react';
import { useMapContext } from 'googlemaps-react-primitives';

interface Props extends google.maps.InfoWindowOptions {
  content: string;
  position: google.maps.LatLngLiteral;
}

function InfoWindow({ content, position }: Props) {
  const infoWindow = useRef<google.maps.InfoWindow>();
  const { map } = useMapContext();

  useEffect(() => {
    if (!infoWindow.current) {
      infoWindow.current = new google.maps.InfoWindow({ content, position });
      infoWindow.current.open(map);
      return () => {
        if (infoWindow.current) {
          infoWindow.current.close();
          infoWindow.current = undefined;
        }
      };
    }

    return undefined;
  }, [content, map, position]);

  useEffect(() => {
    if (infoWindow.current && map) {
      // Only run the effect if the infoWindow and map are defined
      infoWindow.current.setOptions({
        content,
        position,
        pixelOffset: new google.maps.Size(0, -40)
      });
    }
  }, [map, content, position]); // Add map as a dependency

  return null;
}

export default InfoWindow;
