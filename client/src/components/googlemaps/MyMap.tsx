import { useState, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { GoogleMap, SvgMarker } from 'googlemaps-react-primitives';
import InfoWindow from './components/InfoWindow';
import MultiMarker from './components/MultiMarker';

import styles from './appStyles';

function renderLoadingStatus(status: Status) {
  return <h1>{status}</h1>;
}

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  toiletName: string;
  isFavourite: boolean;
  isOpen: boolean;
};

const myMarkers: MarkerData[] = [
  {
    lat: 48.137154,
    lng: 11.576124,
    id: 'marker001',
    toiletName: 'Toilet 001',
    isFavourite: true,
    isOpen: true
  },
  {
    lat: 52.520008,
    lng: 13.404954,
    id: 'marker002',
    toiletName: 'Toilet 002',
    isFavourite: false,
    isOpen: true
  },
  {
    lat: 48.210033,
    lng: 16.363449,
    id: 'marker003',
    toiletName: 'Toilet 003',
    isFavourite: false,
    isOpen: false
  }
];

function MyMap() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [isMapsLoaded, setMapsLoaded] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string>('');
  const [infoWindowData, setInfoWindowData] = useState<string>('');
  const [infoWindowLocation, setInfoWindowLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const onMarkerClicked = (id: string) => {
    const marker = markers.find((m) => m.id === id);
    if (marker) {
      setActiveMarker(marker.id);
      setInfoWindowData(marker.toiletName);
      setInfoWindowLocation({ lat: marker.lat, lng: marker.lng });
    }
  };

  useEffect(() => {
    if (window.google) {
      setMapsLoaded(true);
      setMarkers(myMarkers);
    }
  }, []);

  return (
    <div style={{ width: '80vw', margin: '10vh auto' }}>
      <Wrapper
        libraries={['geometry']}
        apiKey={import.meta.env.VITE_API_KEY}
        render={renderLoadingStatus}
      >
        <GoogleMap
          style={{ height: '80vh', marginBottom: '1em' }}
          fullscreenControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          zoomControl={false}
          keyboardShortcuts={false}
          backgroundColor='#c8c8c8'
          styles={styles}
          onClick={() => {
            setActiveMarker('');
          }}
          autoFit
        >
          {markers.map((marker) => {
            return (
              <MultiMarker
                key={marker.id}
                position={marker}
                id={marker.id}
                isFavourite={marker.isFavourite}
                isOpen={marker.isOpen}
                onClick={onMarkerClicked}
              />
            );
          })}
          {activeMarker && (
            <InfoWindow
              content={infoWindowData}
              position={infoWindowLocation}
            />
          )}
          <SvgMarker
            position={{ lat: 48.864716, lng: 2.349014 }}
            svg={`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#e74c3c" d="M12 0a8 8 0 0 0-7 12l7 12 7-12a8 8 0 0 0-7-12zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
              <path fill="#c0392b" d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
            </svg>`}
          />
        </GoogleMap>
      </Wrapper>
    </div>
  );
}

export default MyMap;
