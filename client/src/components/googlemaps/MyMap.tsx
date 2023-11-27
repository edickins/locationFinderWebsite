import { useEffect, useState } from 'react';
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

  const [infoWindowData, setInfoWindowData] = useState<string>('');
  const [mapStyle, setMapStyle] = useState<google.maps.MapTypeStyle[]>([]);
  const [markerClicks, setMarkerClicks] = useState(0);
  const [infoWindowLocation, setInfoWindowLocation] =
    useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });

  useEffect(() => {
    const locationID = searchParams.get('locationID');
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
  }, [items, searchParams, setSelectedItemDetailID]);

  // TODO make this work for light theme too
  useEffect(() => {
    setMapStyle(
      window.matchMedia('(prefers-color-scheme:dark').matches
        ? styles.night
        : styles.retro
    );
  }, []);

  function clearLocationID() {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    // delete the locationID searchParam
    newSearchParams.delete('locationID');
    // Replace the search parameters - this will be picked up in MyMap and Home
    setSearchParams(newSearchParams);
  }

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
            clearLocationID();
          }}
          center={{ lat: 50.8249486, lng: -0.1270007 }}
          zoom={12}
          minZoom={12}
          autoFit
        >
          <MapReporter setGoogleMapRef={setGoogleMapRef} />
          <MarkerRenderer items={items} mapMarkerRefs={mapMarkerRefs} />
          {/* {activeMarker && ( */}
          <InfoWindow
            // set the key so that the InfoWindow re-renders if the same Marker is clicked
            key={markerClicks}
            content={infoWindowData}
            position={infoWindowLocation}
          />
          {/* )} */}
          <UserLocationDisplay />
        </GoogleMap>
      </Wrapper>
    </div>
  );
}

export default MyMap;
