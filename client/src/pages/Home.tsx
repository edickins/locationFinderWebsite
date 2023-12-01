import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FiltersProvider, {
  useFiltersContext
} from '../context/filtersContext/filtersContext';
import DetailPanel from '../components/detailpanel/DetailPanel';
import FilterPanel from '../components/filterpanel/FilterPanel';
import MyMap from '../components/googlemaps/MyMap';
import { useLocationsContext } from '../context/locationContext/locationsContext';
import { ILocation } from '../context/locationContext/types';
import { IMultiMarkerRef } from '../components/googlemaps/components/MultiMarker';
import useGetScreensize, { ScreenSizeEnum } from '../hooks/getScreensize';

function Home() {
  const screenSize = useGetScreensize();
  const [detailPanelItem, setDetailPanelItem] = useState<ILocation | undefined>(
    undefined
  );
  const [nearestAlternativeItem, setNearestAlternativeItem] = useState<
    ILocation | undefined
  >(undefined);
  const mapMarkerRefs = useRef<IMultiMarkerRef[]>([]);

  // google.maps.Map as useRef
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const setGoogleMapRef = (map: google.maps.Map) => {
    googleMapRef.current = map;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [locationID, setLocationID] = useState(searchParams.get('locationID'));
  const {
    state: { locations }
  } = useLocationsContext();
  const { dispatchFilters } = useFiltersContext();

  // pan to a marker location *and* offset for the available screen space
  // to accommodate the panel which will be covering the map
  const panToWithOffset = useCallback(
    (
      latlng: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined
    ) => {
      let offsetX = 0;
      let offsetY = 150;

      switch (screenSize) {
        case ScreenSizeEnum.XL:
        case ScreenSizeEnum.LG:
        case ScreenSizeEnum.MD:
          offsetX = -150;
          offsetY = 150;
          break;
        case ScreenSizeEnum.SM:
          offsetX = 0;
          offsetY = 175;
          break;
        case ScreenSizeEnum.XS:
          offsetX = 0;
          offsetY = 175;
          break;
        default:
          offsetX = 0;
          offsetY = 0;
      }

      if (googleMapRef.current && latlng) {
        const ov = new google.maps.OverlayView();
        ov.onAdd = function onAdd() {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const overlay = this;
          const proj = overlay.getProjection();
          const aPoint: google.maps.Point | null =
            proj.fromLatLngToContainerPixel(
              latlng instanceof google.maps.LatLng
                ? { lat: latlng.lat(), lng: latlng.lng() }
                : latlng
            );
          if (aPoint !== null) {
            aPoint.x += offsetX;
            aPoint.y += offsetY;
            const latLng = proj.fromContainerPixelToLatLng(aPoint);
            if (latLng !== null) {
              if (googleMapRef.current) {
                setTimeout(() => {
                  googleMapRef.current?.panTo(latLng);
                }, 500);
              }
            }
          }
        };
        ov.draw = function draw() {};
        ov.setMap(googleMapRef.current);
      }
    },
    [screenSize]
  );

  useEffect(() => {
    const newLocationID = searchParams.get('locationID');
    if (newLocationID !== locationID) {
      setLocationID(newLocationID);
    }
  }, [locationID, searchParams]);

  // respond to locationID being set in searchParams
  useEffect(() => {
    if (locationID) {
      const location = locations.find((loc) => loc.id === locationID);
      if (location) {
        panToWithOffset(location.geometry.location);
      }
    }
  }, [locationID, locations, panToWithOffset, searchParams]);

  const setSelectedItemDetailID = (id: string | null) => {
    const selectedItem = locations.find((location) => location.id === id);
    if (selectedItem) {
      setDetailPanelItem(selectedItem);
      setNearestAlternativeItem(
        locations.find(
          (location) => location.id === selectedItem?.nearest_alternative
        )
      );
    } else {
      setDetailPanelItem(undefined);
      setNearestAlternativeItem(undefined);
    }
  };

  return (
    <FiltersProvider>
      <main
        className='absolute bottom-0 top-10 w-full md:top-16'
        id='home-container'
      >
        <MyMap
          items={locations}
          setSelectedItemDetailID={setSelectedItemDetailID}
          mapMarkerRefs={mapMarkerRefs}
          setGoogleMapRef={setGoogleMapRef}
        />
        <DetailPanel
          item={detailPanelItem}
          nearestAlternativeItem={nearestAlternativeItem}
        />
        <div
          id='filter-panel-wrapper'
          className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 mx-auto'
        >
          <FilterPanel />
        </div>
      </main>
    </FiltersProvider>
  );
}

export default Home;
