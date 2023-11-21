import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useMapContext, useMapEffect } from 'googlemaps-react-primitives';
import { regularSVG, activeFilterSVG, closedSVG } from './markerSVGs';

interface Props extends google.maps.MarkerOptions {
  id: string;
  isFavourite: boolean;
  isFilterActive: boolean;
  open_status: string;
  mapMarkerRefs: React.MutableRefObject<IMultiMarkerRef[]>;
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
  ...options
}: Props) {
  const marker = useRef<google.maps.Marker>();
  const { map, addMarker, removeMarker } = useMapContext();
  const [markerIcon, setMarkerIcon] = useState<IIcon>({
    url: `data:image/svg+xml;base64,${window.btoa(regularSVG)}`,
    scaledSize: new google.maps.Size(markerWidth, markerHeight)
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // get the correct SVG for the Marker

    console.log(isFilterActive);

    let svg = isFavourite || isFilterActive ? activeFilterSVG : regularSVG;
    svg = open_status === `closed` ? closedSVG : svg;
    const icon = {
      url: `data:image/svg+xml;base64,${window.btoa(svg)}`,
      scaledSize: new google.maps.Size(markerWidth, markerHeight)
    };

    setMarkerIcon(icon);
  }, [isFavourite, isFilterActive, open_status]);

  useEffect(() => {
    const onMarkerClicked = () => {
      if (id) {
        // Create a new URLSearchParams instance to clone the current parameters
        const newSearchParams = new URLSearchParams(searchParams.toString());

        // Set the new locationID parameter
        newSearchParams.set('locationID', id);

        // Replace the search parameters - this will be picked up in Home
        setSearchParams(newSearchParams);
      }
    };
    if (!marker.current) {
      marker.current = new google.maps.Marker({
        ...options,
        map,
        icon: markerIcon
      });
      marker.current.addListener('click', onMarkerClicked);
      addMarker(marker.current);
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
    searchParams,
    setSearchParams
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
