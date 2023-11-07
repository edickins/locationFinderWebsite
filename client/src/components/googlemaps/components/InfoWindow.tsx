import { useEffect, useRef, useState } from 'react';
import { useMapContext } from 'googlemaps-react-primitives';

interface Props extends google.maps.InfoWindowOptions {
  content: string;
  position: google.maps.LatLngLiteral;
  setShowPanel: (show: boolean) => void;
}

function InfoWindow({ content, position, setShowPanel }: Props) {
  const infoWindow = useRef<google.maps.InfoWindow>();
  const [clickListener, setClickListener] = useState<
    google.maps.MapsEventListener | undefined
  >();
  const { map } = useMapContext();

  const styledContent = `<div style="color:#040404;padding:4px;font-weight:700">${content}</div>`;

  useEffect(() => {
    console.log(`infoWindow useEffect ${content}`);
    if (!infoWindow.current) {
      infoWindow.current = new google.maps.InfoWindow({ content, position });
      infoWindow.current.open(map);
      setClickListener(
        google.maps.event.addListener(infoWindow.current, 'closeclick', () => {
          setShowPanel(false);
        })
      );
    }

    // cleanup function
    return () => {
      if (infoWindow.current) {
        if (clickListener) {
          google.maps.event.removeListener(clickListener);
        }
        infoWindow.current.close();
        infoWindow.current = undefined;
        console.log(
          `InfoWindow closing the window in the useEffect clean up function.`
        );
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
