import { useEffect, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { GoogleMap } from 'googlemaps-react-primitives';
import InfoWindow from './components/InfoWindow';
import MarkerRenderer from './components/MarkerRenderer';
import { IToilet } from '../../context/toiletContext/types';
import { IMultiMarkerRef } from './components/MultiMarker';

// import styles from './appStyles';
import styles from './multiMapStyles';
import UserLocationDisplay from './components/UserLocationDisplay';

function renderLoadingStatus(status: Status) {
  return <h1>{status}</h1>;
}

type Props = {
  items: IToilet[];
  setSelectedItemDetailID: (id: string | null) => void;
  setShowPanel: (show: boolean) => void;
  userLocation?: { lat: number; lng: number };
  mapMarkerRefs: React.MutableRefObject<IMultiMarkerRef[]>;
};

function MyMap({
  items,
  setSelectedItemDetailID,
  setShowPanel,
  mapMarkerRefs,
  userLocation
}: Props) {
  const [activeMarker, setActiveMarker] = useState<string>('');
  const [infoWindowData, setInfoWindowData] = useState<string>('');
  const [mapStyle, setMapStyle] = useState<google.maps.MapTypeStyle[]>([]);
  const [markerClicks, setMarkerClicks] = useState(0);
  const [infoWindowLocation, setInfoWindowLocation] =
    useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const [isDarkTheme, setIsDarkTheme] = useState(
    window.matchMedia('(prefers-color-scheme:dark')
  );

  const onMarkerClicked = (id: string) => {
    const marker = items.find((m) => m.id === id);
    if (marker) {
      setMarkerClicks((prev) => prev + 1);
      setActiveMarker(marker.id);
      setInfoWindowData(marker.long_name);
      setInfoWindowLocation(marker.geometry.location);
      setSelectedItemDetailID(marker.id);
    }
  };

  // TODO make this work for light theme too
  useEffect(() => {
    setMapStyle(
      window.matchMedia('(prefers-color-scheme:dark').matches
        ? styles.night
        : styles.retro
    );
  }, [isDarkTheme]);

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
            setActiveMarker('');
          }}
          center={{ lat: 50.8249486, lng: -0.1270007 }}
          zoom={12}
          minZoom={12}
          autoFit
        >
          <MarkerRenderer
            onMarkerClicked={onMarkerClicked}
            items={items}
            mapMarkerRefs={mapMarkerRefs}
          />
          {activeMarker && (
            <InfoWindow
              // set the key so that the InfoWindow re-renders if the same Marker is clicked
              key={markerClicks}
              content={infoWindowData}
              position={infoWindowLocation}
              setShowPanel={setShowPanel}
            />
          )}
          {userLocation && <UserLocationDisplay userLocation={userLocation} />}
        </GoogleMap>
      </Wrapper>
    </div>
  );
}

MyMap.defaultProps = {
  userLocation: undefined
};

export default MyMap;
