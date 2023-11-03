import { useEffect, useRef, useState } from 'react';
import { useMapContext, useMapEffect } from 'googlemaps-react-primitives';

interface Props extends google.maps.MarkerOptions {
  id: string;
  isFavourite: boolean;
  isFilterActive: boolean;
  open_status: string;
  onMarkerClicked?: (id: string) => void;
}

interface IIcon {
  url: string;
  scaledSize: google.maps.Size;
}

const regularSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="#e74c3c" d="M12 0a8 8 0 0 0-7 12l7 12 7-12a8 8 0 0 0-7-12zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
  <path fill="#c0392b" d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
</svg>`;
const favouriteSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
<path fill="#eebb11
" d="M12 0a8 8 0 0 0-7 12l7 12 7-12a8 8 0 0 0-7-12zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"></path>
<circle cx="12" cy="8" r="4.5" stroke="#000000" stroke-width="1" fill="#ee3633" />
</svg>`;
const closedSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill="#2a2a2a" d="M12 0a8 8 0 0 0-7 12l7 12 7-12a8 8 0 0 0-7-12zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
<path fill="#5c5c5c" d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
</svg>`;

const markerHeight = 25;
const markerWidth = 25;

export default function MultiMarker({
  id,
  isFavourite,
  isFilterActive,
  open_status,
  onMarkerClicked,
  ...options
}: Props) {
  const marker = useRef<google.maps.Marker>();
  const { map, addMarker, removeMarker } = useMapContext();
  const [markerIcon, setMarkerIcon] = useState<IIcon>({
    url: `data:image/svg+xml;base64,${window.btoa(regularSVG)}`,
    scaledSize: new google.maps.Size(markerWidth, markerHeight)
  });
  const onClickRef = useRef(onMarkerClicked);
  onClickRef.current = onMarkerClicked;

  function panToWithOffset(
    latlng: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined,
    offsetX: number,
    offsetY: number
  ) {
    if (map && latlng) {
      const ov = new google.maps.OverlayView();
      ov.onAdd = function () {
        const proj = this.getProjection();
        const aPoint: google.maps.Point | null =
          proj.fromLatLngToContainerPixel(
            latlng instanceof google.maps.LatLng
              ? { lat: latlng.lat(), lng: latlng.lng() }
              : latlng
          );
        if (aPoint !== null) {
          aPoint.x = aPoint.x + offsetX;
          aPoint.y = aPoint.y + offsetY;
          const latLng = proj.fromContainerPixelToLatLng(aPoint);
          if (latLng !== null) {
            map.panTo(latLng);
          }
        }
      };
      ov.draw = function () {};
      ov.setMap(map);
    }
  }

  useEffect(() => {
    // get the correct SVG for the Marker
    let svg = isFavourite || isFilterActive ? favouriteSVG : regularSVG;
    svg = open_status === `closed` ? closedSVG : svg;
    const icon = {
      url: `data:image/svg+xml;base64,${window.btoa(svg)}`,
      scaledSize: new google.maps.Size(markerWidth, markerHeight)
    };

    setMarkerIcon(icon);
  }, [isFavourite, isFilterActive, open_status]);

  useEffect(() => {
    if (!marker.current) {
      marker.current = new google.maps.Marker({
        ...options,
        map,
        icon: markerIcon
      });
      if (onMarkerClicked) {
        marker.current.addListener('click', () => onMarkerClicked(id));
        marker.current.addListener('click', () => {
          panToWithOffset(options.position, 0, 150);
        });
      }
      addMarker(marker.current);
      return () => {
        if (marker.current) {
          google.maps.event.clearListeners(marker, 'click');
          removeMarker(marker.current);
          marker.current = undefined;
        }
        return undefined;
      };
    }
  }, [addMarker, id, map, markerIcon, onMarkerClicked, options, removeMarker]);

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
  onMarkerClicked: () => {}
};
