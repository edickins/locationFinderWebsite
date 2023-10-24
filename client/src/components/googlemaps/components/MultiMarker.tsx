import { useEffect, useRef, useState } from 'react';
import { useMapContext, useMapEffect } from 'googlemaps-react-primitives';

interface Props extends google.maps.MarkerOptions {
  id: string;
  isFavourite: boolean;
  isOpen: boolean;
  onClick?: (id: string) => void;
}

interface IIcon {
  url: string;
  scaledSize: google.maps.Size;
}

const regularSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="#e74c3c" d="M12 0a8 8 0 0 0-7 12l7 12 7-12a8 8 0 0 0-7-12zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
  <path fill="#c0392b" d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
</svg>`;
const favouriteSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill="#e74c3c" d="M12 0a8 8 0 0 0-7 12l7 12 7-12a8 8 0 0 0-7-12zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
<path fill="#fff93c" d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
</svg>`;
const closedSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill="#2a2a2a" d="M12 0a8 8 0 0 0-7 12l7 12 7-12a8 8 0 0 0-7-12zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
<path fill="#5c5c5c" d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
</svg>`;

export default function MultiMarker({
  id,
  isFavourite,
  isOpen,
  onClick,
  ...options
}: Props) {
  const marker = useRef<google.maps.Marker>();
  const { map, addMarker, removeMarker } = useMapContext();
  const [markerIcon, setMarkerIcon] = useState<IIcon>({
    url: `data:image/svg+xml;base64,${window.btoa(regularSVG)}`,
    scaledSize: new google.maps.Size(45, 45)
  });

  useEffect(() => {
    let svg = isFavourite ? favouriteSVG : regularSVG;
    svg = !isOpen ? closedSVG : svg;
    const icon = {
      url: `data:image/svg+xml;base64,${window.btoa(svg)}`,
      scaledSize: new google.maps.Size(45, 45)
    };

    setMarkerIcon(icon);
  }, [isFavourite, isOpen]);

  useEffect(() => {
    if (!marker.current) {
      marker.current = new google.maps.Marker({
        ...options,
        map,
        icon: markerIcon
      });
      addMarker(marker.current);
      return () => {
        if (marker.current) {
          removeMarker(marker.current);
          marker.current = undefined;
        }
      };
    }

    return undefined;
  }, [addMarker, map, markerIcon, options, removeMarker]);

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
