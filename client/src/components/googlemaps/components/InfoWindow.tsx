import { useEffect, useRef } from 'react';
import { useMapContext } from 'googlemaps-react-primitives';

interface Props extends google.maps.InfoWindowOptions {
  content: string;
  position: google.maps.LatLngLiteral;
  setShowPanel: (show: boolean) => void;
}

function InfoWindow({ content, position, setShowPanel }: Props) {
  const infoWindow = useRef<google.maps.InfoWindow>();
  const { map } = useMapContext();

  const styledContent = `<div style="color:#040404;padding:4px;font-weight:700">${content}</div>`;

  useEffect(() => {
    if (!infoWindow.current) {
      infoWindow.current = new google.maps.InfoWindow({ content, position });
      infoWindow.current.open(map);
      google.maps.event.addListener(infoWindow.current, 'closeclick', () => {
        setShowPanel(false);
      });
    }

    // cleanup function
    return () => {
      if (infoWindow.current) {
        infoWindow.current.close();
        infoWindow.current = undefined;
      }
    };
  }, [content, map, position]);

  useEffect(() => {
    if (infoWindow.current && map) {
      infoWindow.current.setOptions({
        content: styledContent,
        position,
        pixelOffset: new google.maps.Size(0, -30)
      });
    }
  }, [map, content, position]);

  return null;
}

export default InfoWindow;
