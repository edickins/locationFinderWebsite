import { useEffect, useRef, useState } from 'react';
import { useMapContext, useMapEffect } from 'googlemaps-react-primitives';
import { regularSVG, activeFilterSVG, closedSVG } from './markerSVGs';

interface Props extends google.maps.MarkerOptions {
  id: string;
  isFavourite: boolean;
  isFilterActive: boolean;
  open_status: string;
  mapMarkerRefs: React.MutableRefObject<IMultiMarkerRef[]>;
  onMarkerClicked: (id: string) => void;
}

export type IMultiMarkerRef = {
  id: string;
  marker: google.maps.Marker | undefined;
};

interface IIcon {
  url: string;
  scaledSize: google.maps.Size;
}

const markerHeight = 25;
const markerWidth = 25;

export default function MultiMarker({
  id,
  isFavourite,
  isFilterActive,
  open_status,
  mapMarkerRefs,
  onMarkerClicked,
  ...options
}: Props) {
  const marker = useRef<google.maps.Marker>();
  const { map, addMarker, removeMarker } = useMapContext();
  const [markerIcon, setMarkerIcon] = useState<IIcon>({
    url: `data:image/svg+xml;base64,${window.btoa(regularSVG)}`,
    scaledSize: new google.maps.Size(markerWidth, markerHeight)
  });

  useEffect(() => {
    // get the correct SVG for the Marker
    let svg = isFavourite || isFilterActive ? activeFilterSVG : regularSVG;
    svg = /closed/i.test(open_status) ? closedSVG : svg;

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

      marker.current.addListener('click', (e: google.maps.MapMouseEvent) => {
        e.stop();
        onMarkerClicked(id);
      });
      addMarker(marker.current);
      // TODO can this be done without setting the useRef value directly here?
      if (marker.current) {
        // eslint-disable-next-line no-param-reassign
        mapMarkerRefs.current = [
          ...mapMarkerRefs.current,
          { id, marker: marker.current }
        ];
      }
    }

    return () => {
      if (marker.current) {
        google.maps.event.clearListeners(marker, 'click');
        removeMarker(marker.current);
        marker.current = undefined;
      }
      return undefined;
    };
  }, [
    addMarker,
    id,
    map,
    markerIcon,
    options,
    removeMarker,
    mapMarkerRefs,
    onMarkerClicked
  ]);

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
  }, [map, options]);

  return null;
}
