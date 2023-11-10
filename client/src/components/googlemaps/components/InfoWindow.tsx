import { useEffect, useRef } from 'react';
import { useMapContext } from 'googlemaps-react-primitives';

interface Props extends google.maps.InfoWindowOptions {
  content: string;
  position: google.maps.LatLngLiteral;
  setShowPanel: (show: boolean) => void;
}

function InfoWindow({ content, position, setShowPanel }: Props) {
  const infoWindowRef = useRef<google.maps.InfoWindow>();
  const clickListenerRef = useRef<google.maps.MapsEventListener | undefined>();
  const { map } = useMapContext();

  useEffect(() => {
    if (!infoWindowRef.current) {
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
          setShowPanel(false);
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
  }, [map, content, position, setShowPanel]);

  return null;
}

export default InfoWindow;
