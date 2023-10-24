import { useEffect, useRef } from 'react';
import { useMapContext, useMapEffect } from 'googlemaps-react-primitives';

interface Props extends google.maps.MarkerOptions {
  id: string;
  isFavourite: boolean;
  isOpen: boolean;
  onClick?: (id: string) => void;
}

export default function MultiMarker({
  id,
  isFavourite,
  isOpen,
  onClick,
  ...options
}: Props) {
  const marker = useRef<google.maps.Marker>();
  const { map, addMarker, removeMarker } = useMapContext();

  useEffect(() => {
    if (!marker.current) {
      marker.current = new google.maps.Marker({ ...options, map });
      addMarker(marker.current);
      return () => {
        if (marker.current) {
          removeMarker(marker.current);
          marker.current = undefined;
        }
      };
    }

    return undefined;
  }, [addMarker, map, options, removeMarker]);

  useEffect(() => {
    if (marker.current) {
      google.maps.event.clearListeners(marker, 'click');
      if (onClick) {
        marker.current.addListener('click', (ev: google.maps.MapMouseEvent) =>
          onClick(id)
        );
      }
    }
  }, [id, onClick]);

  useMapEffect(() => {
    if (marker.current) {
      marker.current.setOptions(options);
    }
  }, [marker.current, options]);

  useEffect(() => {
    if (marker.current && map) {
      // Only run the effect if the marker and map are defined
      marker.current.setOptions(options);
    }
  }, [map, options]); // Add map as a dependency

  return null;
}

MultiMarker.defaultProps = {
  onClick: () => {}
};
