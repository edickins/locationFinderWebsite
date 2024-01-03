import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { GoogleMap } from 'googlemaps-react-primitives';
import InfoWindow from './components/InfoWindow';
import MarkerRenderer from './components/MarkerRenderer';
import MapReporter from './components/MapReporter';
import { ILocation } from '../../context/locationContext/types';
import { IMultiMarkerRef } from './components/MultiMarker';

import styles from './multiMapStyles';
import UserLocationDisplay from './components/UserLocationDisplay';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import useGetScreensize, { ScreenSizeEnum } from '../../hooks/getScreensize';

function renderLoadingStatus(status: Status) {
  if (status === Status.LOADING || status === Status.FAILURE) {
    return <i className='fa-duotone fa-spinner fa-spin-pulse' />;
  }

  return <></>;
}

type Props = {
  items: ILocation[];
  locationID: string | null;
  nearestLocationID: string | undefined;
  onMarkerClicked: (id: string) => void;
  setGoogleMapRef: (map: google.maps.Map) => void;
  mapMarkerRefs: React.MutableRefObject<IMultiMarkerRef[]>;
  defaultMapProps: { center: { lat: number; lng: number }; zoom: number };
};

type MapProps = {
  center: { lat: number; lng: number };
  zoom: number;
};

function MyMap({
  items,
  locationID,
  nearestLocationID,
  onMarkerClicked,
  setGoogleMapRef,
  mapMarkerRefs,
  defaultMapProps
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams] = useSearchParams();
  const { dispatchFilters } = useFiltersContext();
  const screenSize = useGetScreensize();

  const [activeFilters, setActiveFilters] = useState<string | null>();
  const [infoWindowData, setInfoWindowData] = useState<string>('');
  const [mapStyle, setMapStyle] = useState<google.maps.MapTypeStyle[]>([]);
  const [markerClicks, setMarkerClicks] = useState(0);
  const [infoWindowLocation, setInfoWindowLocation] =
    useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const [mapProps, setMapProps] = useState<MapProps>({
    center: { lat: 50.8249486, lng: -0.1270007 },
    zoom: 12
  });

  // update the Array of user selected filters that are active
  useEffect(() => {
    const newFilters = searchParams.get('filters');
    if (newFilters !== activeFilters) {
      setActiveFilters(newFilters);
    }
  }, [activeFilters, searchParams]);

  // respond to screensize when the map loads.
  useEffect(() => {
    switch (screenSize) {
      case ScreenSizeEnum.XL:
      case ScreenSizeEnum.LG: {
        setMapProps((prevMapProps) => ({
          ...prevMapProps,
          center: defaultMapProps.center,
          zoom: defaultMapProps.zoom
        }));
        break;
      }
      case ScreenSizeEnum.MD: {
        setMapProps((prevMapProps) => ({
          ...prevMapProps,
          center: { lat: 50.8249486, lng: -0.1270007 },
          zoom: 12
        }));
        break;
      }
      default:
        setMapProps((prevMapProps) => ({
          ...prevMapProps,
          center: defaultMapProps.center,
          zoom: defaultMapProps.zoom
        }));
    }
  }, [setMapProps, screenSize, defaultMapProps]);

  useEffect(() => {
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
  }, [dispatchFilters, items, locationID, nearestLocationID]);

  // TODO make this work for light theme too
  useEffect(() => {
    setMapStyle(
      window.matchMedia('(prefers-color-scheme:dark').matches
        ? styles.night
        : styles.retro
    );
  }, []);

  console.log('mymap render');

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
          center={mapProps.center}
          zoom={mapProps.zoom}
          minZoom={12}
          autoFit
        >
          <MapReporter setGoogleMapRef={setGoogleMapRef} />
          <MarkerRenderer
            items={items}
            mapMarkerRefs={mapMarkerRefs}
            activeFilters={activeFilters}
            onMarkerClicked={onMarkerClicked}
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
