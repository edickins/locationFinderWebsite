import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { GoogleMap } from 'googlemaps-react-primitives';
import InfoWindow from './components/InfoWindow';
import MarkerRenderer from './components/MarkerRenderer';
import MapReporter from './components/MapReporter';
import { ILocation } from '../../context/locationContext/types';

import styles from './multiMapStyles';
import UserLocationDisplay from './components/UserLocationDisplay';
import { usePanelStateContext } from '../../context/panelStateContext/panelStateContext';

function renderLoadingStatus(status: Status) {
  if (status === Status.LOADING || status === Status.FAILURE) {
    return <i className='fa-duotone fa-spinner fa-spin-pulse' />;
  }

  return <></>;
}

type MapProps = {
  center: { lat: number; lng: number };
  zoom: number;
};

type Props = {
  items: ILocation[];
  nearestLocationID: string | undefined;
  setGoogleMapRef: (map: google.maps.Map) => void;
  onMarkerClicked: (id: string) => void;
  findNearestLocation: (loc: { lat: number; lng: number }) => void;
  defaultMapProps: MapProps;
};

function MyMap({
  items,
  nearestLocationID,
  setGoogleMapRef,
  onMarkerClicked,
  findNearestLocation,
  defaultMapProps
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { dispatchFilters } = usePanelStateContext();

  const [activeFilters, setActiveFilters] = useState<string | null>();
  const [infoWindowData, setInfoWindowData] = useState<string>('');
  const [mapStyle, setMapStyle] = useState<google.maps.MapTypeStyle[]>([]);
  const [markerClicks, setMarkerClicks] = useState(0);
  const [infoWindowLocation, setInfoWindowLocation] =
    useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });

  const updateSearchParams = (key: string, value: string) => {
    if (!key) return;
    // update the URL with new filters or delete that key if there are no values
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (!value) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }
    setSearchParams(newSearchParams);
  };

  // update the Array of user selected filters that are active
  useEffect(() => {
    const newFilters = searchParams.get('filters');
    if (newFilters !== activeFilters) {
      setActiveFilters(newFilters);
    }
  }, [activeFilters, searchParams]);

  useEffect(() => {
    const locationID = searchParams.get('locationID');
    if (!items) return;
    const location = items.find((loc) => loc.id === locationID);
    if (location) {
      setMarkerClicks((prev) => prev + 1);
      let infoData = /closed/i.test(location.open_status)
        ? `${location.long_name} \ncurrently closed`
        : location.long_name;

      if (nearestLocationID && nearestLocationID === locationID) {
        infoData = `<div class="text-center">your nearest location<br> ${infoData}</div>`;
      }

      setInfoWindowData(infoData);
      setInfoWindowLocation(location.geometry.location);
    }
  }, [dispatchFilters, items, nearestLocationID, searchParams]);

  // TODO make this work for light theme too
  useEffect(() => {
    setMapStyle(
      window.matchMedia('(prefers-color-scheme:dark').matches
        ? styles.night
        : styles.retro
    );
  }, []);

  return (
    <div className='absolute bottom-0 left-0 right-0 top-0' id='map-container'>
      <Wrapper
        libraries={['geometry']}
        apiKey={import.meta.env.VITE_API_KEY}
        render={renderLoadingStatus}
      >
        <GoogleMap
          className='mb-4 h-full md:mb-0'
          fullscreenControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          zoomControl={false}
          keyboardShortcuts={false}
          backgroundColor='#c8c8c8'
          styles={mapStyle}
          onClick={() => {
            // TODO keeping this here just in case I need it later
          }}
          center={defaultMapProps.center}
          zoom={defaultMapProps.zoom}
          minZoom={12}
          autoFit
        >
          <MapReporter setGoogleMapRef={setGoogleMapRef} />
          <MarkerRenderer
            items={items}
            activeFilters={activeFilters}
            onMarkerClicked={onMarkerClicked}
          />
          <InfoWindow
            // set the key so that the InfoWindow re-renders if the same Marker is clicked
            key={markerClicks}
            content={infoWindowData}
            position={infoWindowLocation}
            updateSearchParams={updateSearchParams}
            locationID={searchParams.get('locationID')}
          />

          <UserLocationDisplay
            findNearestLocation={findNearestLocation}
            userLocation={searchParams.get('userLocation')}
            locationID={searchParams.get('locationID')}
          />
        </GoogleMap>
      </Wrapper>
    </div>
  );
}

export default MyMap;
