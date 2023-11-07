import { useEffect, useRef, useState } from 'react';
import { useMapContext, useMapEffect } from 'googlemaps-react-primitives';
import { regularSVG, activeFilterSVG, closedSVG } from './markerSVGs';
interface Props extends google.maps.MarkerOptions {
  id: string;
  isFavourite: boolean;
  isFilterActive: boolean;
  open_status: string;
  onMarkerClicked?: (id: string) => void;
  setGooglemapMarkerRefs: React.Dispatch<
    React.SetStateAction<IMultiMarkerRef[]>
  >;
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
  onMarkerClicked,
  setGooglemapMarkerRefs,
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
    let svg = isFavourite || isFilterActive ? activeFilterSVG : regularSVG;
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
      if (marker.current) {
        setGooglemapMarkerRefs((prevItems: IMultiMarkerRef[]) => [
          ...prevItems,
          { id: id, marker: marker.current }
        ]);
      }

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
