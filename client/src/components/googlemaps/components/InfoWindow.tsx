import { useEffect, useRef, useState } from 'react';
import { useMapContext } from 'googlemaps-react-primitives';

interface Props extends google.maps.InfoWindowOptions {
  content: string;
  position: google.maps.LatLngLiteral;
  setShowPanel: (show: boolean) => void;
}

function InfoWindow({ content, position, setShowPanel }: Props) {
  const infoWindowRef = useRef<google.maps.InfoWindow>();
  const [clickListener, setClickListener] = useState<
    google.maps.MapsEventListener | undefined
  >();
  const { map } = useMapContext();

  const styledContent = `<div style="color:#040404;padding:4px;font-weight:700">${content}</div>`;

  useEffect(() => {
    if (!infoWindowRef.current) {
      infoWindowRef.current = new google.maps.InfoWindow({ content, position });
      infoWindowRef.current.open(map);
      setClickListener(
        google.maps.event.addListener(
          infoWindowRef.current,
          'closeclick',
          () => {
            setShowPanel(false);
          }
        )
      );
    }

    // cleanup function
    return () => {
      if (infoWindowRef.current) {
        if (clickListener) {
          google.maps.event.removeListener(clickListener);
        }
        infoWindowRef.current.close();
        infoWindowRef.current = undefined;
      }
    };
  }, [content, map, position]);

  useEffect(() => {
    if (infoWindowRef.current && map) {
      infoWindowRef.current.setOptions({
        content: styledContent,
        position,
        pixelOffset: new google.maps.Size(0, -30)
      });
    }
  }, [map, content, position]);

  return null;
}

export default InfoWindow;
