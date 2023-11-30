import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { GoogleMap } from 'googlemaps-react-primitives';
import InfoWindow from './components/InfoWindow';
import MarkerRenderer from './components/MarkerRenderer';
import MapReporter from './components/MapReporter';
import { ILocation } from '../../context/locationContext/types';
import { IMultiMarkerRef } from './components/MultiMarker';

// import styles from './appStyles';
import styles from './multiMapStyles';
import UserLocationDisplay from './components/UserLocationDisplay';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';

function renderLoadingStatus(status: Status) {
  return <i className='fa-duotone fa-spinner fa-spin-pulse' />;
}

type Props = {
  items: ILocation[];
  setSelectedItemDetailID: (id: string | null) => void;
  setGoogleMapRef: (map: google.maps.Map) => void;
  mapMarkerRefs: React.MutableRefObject<IMultiMarkerRef[]>;
};

function MyMap({
  items,
  setSelectedItemDetailID,
  setGoogleMapRef,
  mapMarkerRefs
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [locationID, setLocationID] = useState(searchParams.get('locationID'));
  const [activeFilters, setActiveFilters] = useState<string | null>();
  const { state, dispatchFilters } = useFiltersContext();

  const [infoWindowData, setInfoWindowData] = useState<string>('');
  const [mapStyle, setMapStyle] = useState<google.maps.MapTypeStyle[]>([]);
  const [markerClicks, setMarkerClicks] = useState(0);
  const [infoWindowLocation, setInfoWindowLocation] =
    useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const lastLocationIDRef = useRef<string | null>();

  useEffect(() => {
    const newLocationID = searchParams.get('locationID');
    if (newLocationID !== locationID) {
      setLocationID(newLocationID);
    }
  }, [locationID, searchParams]);

  useEffect(() => {
    const newFilters = searchParams.get('filters');
    if (newFilters !== activeFilters) {
      setActiveFilters(newFilters);
    }
  }, [activeFilters, searchParams]);

  useEffect(() => {
    if (lastLocationIDRef.current !== locationID) {
      const location = items.find((loc) => loc.id === locationID);
      if (location) {
        setMarkerClicks((prev) => prev + 1);
        const infoData = /closed/i.test(location.open_status)
          ? `${location.long_name} \ncurrently closed`
          : location.long_name;

        setInfoWindowData(infoData);
        setInfoWindowLocation(location.geometry.location);
        setSelectedItemDetailID(location.id);
      } else {
        setSelectedItemDetailID(null);
      }
    }

    lastLocationIDRef.current = locationID;
  }, [
    dispatchFilters,
    items,
    locationID,
    searchParams,
    setSelectedItemDetailID
  ]);

  // TODO make this work for light theme too
  useEffect(() => {
    setMapStyle(
      window.matchMedia('(prefers-color-scheme:dark').matches
        ? styles.night
        : styles.retro
    );
  }, []);

  return (
    <div className='width-full h-full' id='map-container'>
      <Wrapper
        libraries={['geometry']}
        apiKey={import.meta.env.VITE_API_KEY}
        render={renderLoadingStatus}
      >
        <GoogleMap
          className='mb-4 h-full'
          fullscreenControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          zoomControl={false}
          keyboardShortcuts={false}
          backgroundColor='#c8c8c8'
          styles={mapStyle}
          onClick={() => {
            setSelectedItemDetailID(null);
          }}
          center={{ lat: 50.8249486, lng: -0.1270007 }}
          zoom={12}
          minZoom={12}
          autoFit
        >
          <MapReporter setGoogleMapRef={setGoogleMapRef} />
          <MarkerRenderer
            items={items}
            mapMarkerRefs={mapMarkerRefs}
            activeFilters={activeFilters}
          />
          <InfoWindow
            // set the key so that the InfoWindow re-renders if the same Marker is clicked
            key={markerClicks}
            content={infoWindowData}
            position={infoWindowLocation}
          />

          <UserLocationDisplay />
        </GoogleMap>
      </Wrapper>
    </div>
  );
}

export default MyMap;
