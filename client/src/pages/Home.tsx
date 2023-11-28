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
import { FiltersActionEnum } from '../reducer/filtersReducer/types';

function Home() {
  // Define your enum
  const ScreenSize = {
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl'
  };

  // Define your breakpoints
  const breakpoints = {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  };

  // State variable for screen size
  const [screenSize, setScreenSize] = useState<string | undefined>();
  const [detailPanelItem, setDetailPanelItem] = useState<ILocation | undefined>(
    undefined
  );
  const [nearestAlternativeItem, setNearestAlternativeItem] = useState<
    ILocation | undefined
  >(undefined);
  const mapMarkerRefs = useRef<IMultiMarkerRef[]>([]);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const setGoogleMapRef = (map: google.maps.Map) => {
    googleMapRef.current = map;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    state: { locations }
  } = useLocationsContext();
  const { state, dispatchFilters } = useFiltersContext();

  const getScreenSize = useCallback(
    (width: number) => {
      if (width < breakpoints.xs) {
        return ScreenSize.XS;
      }
      if (width < breakpoints.sm) {
        return ScreenSize.SM;
      }
      if (width < breakpoints.md) {
        return ScreenSize.MD;
      }
      if (width < breakpoints.lg) {
        return ScreenSize.LG;
      }
      return ScreenSize.XL;
    },
    [
      ScreenSize.LG,
      ScreenSize.MD,
      ScreenSize.SM,
      ScreenSize.XL,
      ScreenSize.XS,
      breakpoints.lg,
      breakpoints.md,
      breakpoints.sm,
      breakpoints.xs
    ]
  );

  // pan to a marker location *and* offset for the available screen space
  // to accommodate the panel which will be covering the map
  const panToWithOffset = useCallback(
    (
      latlng: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined
    ) => {
      let offsetX = 0;
      let offsetY = 150;

      switch (screenSize) {
        case ScreenSize.XL:
        case ScreenSize.LG:
        case ScreenSize.MD:
          offsetX = -150;
          offsetY = 150;
          break;
        case ScreenSize.SM:
          offsetX = 0;
          offsetY = 80;
          break;
        case ScreenSize.XS:
          offsetX = 0;
          offsetY = -5;
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
    [
      ScreenSize.LG,
      ScreenSize.MD,
      ScreenSize.SM,
      ScreenSize.XL,
      ScreenSize.XS,
      screenSize
    ]
  );

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenSize(getScreenSize(newWidth));
    };

    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [
    ScreenSize.LG,
    ScreenSize.MD,
    ScreenSize.SM,
    ScreenSize.XL,
    breakpoints.lg,
    breakpoints.md,
    breakpoints.sm,
    getScreenSize
  ]);

  // respond to locationID being set in searchParams
  useEffect(() => {
    const locationID = searchParams.get('locationID');
    if (locationID) {
      const location = locations.find((loc) => loc.id === locationID);
      panToWithOffset(location?.geometry.location);
    }
  }, [locations, panToWithOffset, searchParams]);

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

  useEffect(() => {
    console.log(state.isPanelOpen);
    if (state.isPanelOpen) {
      dispatchFilters({ type: FiltersActionEnum.HIDE_FILTER_PANEL });
    }
  }, [dispatchFilters, state.isPanelOpen]);

  // handler for 'Find a toilet near me' button
  const handleFindToiletButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.set('userLocation', JSON.stringify(pos));
          newSearchParams.delete('locationID');
          setSearchParams(newSearchParams);
          dispatchFilters({ type: FiltersActionEnum.HIDE_FILTER_PANEL });
        },
        () => {
          // TODO handle any errors
          // handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // TODO handle any errors
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter()!);
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
        <div className='pointer-events-none  absolute bottom-0 left-0 right-0 top-0 mx-auto max-w-6xl'>
          <FilterPanel
            handleFindToiletButtonClick={handleFindToiletButtonClick}
          />
        </div>
      </main>
    </FiltersProvider>
  );
}

export default Home;
