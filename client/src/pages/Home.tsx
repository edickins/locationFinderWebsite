import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FiltersProvider from '../context/filtersContext/filtersContext';
import DetailPanel from '../components/detailpanel/DetailPanel';
import FilterPanel from '../components/filterpanel/FilterPanel';
import MyMap from '../components/googlemaps/MyMap';
import { useLocationsContext } from '../context/locationContext/locationsContext';
import { ILocation } from '../context/locationContext/types';
import { IMultiMarkerRef } from '../components/googlemaps/components/MultiMarker';

function Home() {
  const [detailPanelItem, setDetailPanelItem] = useState<
    ILocation | undefined
  >();
  const [nearestAlternativeItem, setNearestAlternativeItem] = useState<
    ILocation | undefined
  >();
  const [showPanel, setShowPanel] = useState(false);
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

  // pan to a marker location *and* offset for the available screen space
  // to accommodate the panel which will be covering the map
  const panToWithOffset = (
    latlng: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined,
    offsetX: number,
    offsetY: number
  ) => {
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
              googleMapRef.current.panTo(latLng);
            }
          }
        }
      };
      ov.draw = function draw() {};
      ov.setMap(googleMapRef.current);
    }
  };

  // respond to locationID being set in searchParams
  useEffect(() => {
    const locationID = searchParams.get('locationID');
    if (locationID) {
      const location = locations.find((loc) => loc.id === locationID);
      panToWithOffset(location?.geometry.location, 0, 150);
    }
  }, [locations, searchParams]);

  const setSelectedItemDetailID = (id: string | null) => {
    const selectedItem = locations.find((location) => location.id === id);
    if (selectedItem) {
      setDetailPanelItem(selectedItem);
      setNearestAlternativeItem(
        locations.find(
          (location) => location.id === selectedItem?.nearest_alternative
        )
      );
    }
    setShowPanel(!!(id && selectedItem));
  };

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
          setShowPanel(false);
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
      <main className='absolute bottom-0 top-16 w-full' id='home-container'>
        <MyMap
          items={locations}
          setSelectedItemDetailID={setSelectedItemDetailID}
          // userLocation={userLocation}
          mapMarkerRefs={mapMarkerRefs}
          setGoogleMapRef={setGoogleMapRef}
        />
        <DetailPanel
          item={detailPanelItem}
          nearestAlternativeItem={nearestAlternativeItem}
          showPanel={showPanel}
        />
        <FilterPanel
          handleFindToiletButtonClick={handleFindToiletButtonClick}
        />
      </main>
    </FiltersProvider>
  );
}

export default Home;
