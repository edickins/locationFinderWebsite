import { useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { GoogleMap } from 'googlemaps-react-primitives';
import InfoWindow from './components/InfoWindow';
import MarkerRenderer from './components/MarkerRenderer';
import { IToilet } from '../../context/toiletContext/types';

import styles from './appStyles';

function renderLoadingStatus(status: Status) {
  return <h1>{status}</h1>;
}

function MyMap({ items }: { items: IToilet[] }) {
  const [activeMarker, setActiveMarker] = useState<string>('');
  const [infoWindowData, setInfoWindowData] = useState<string>('');
  const [infoWindowLocation, setInfoWindowLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const onMarkerClicked = (id: string) => {
    const marker = items.find((m) => m.id === id);
    if (marker) {
      setActiveMarker(marker.id);
      setInfoWindowData(marker.long_name);
      setInfoWindowLocation(marker.geometry.location);
    }
  };

  return (
    <div className='width-full'>
      <Wrapper
        libraries={['geometry']}
        apiKey={import.meta.env.VITE_API_KEY}
        render={renderLoadingStatus}
      >
        <GoogleMap
          className='mb-4 h-screen'
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
          center={{ lat: 50.8249486, lng: -0.1270007 }}
          zoom={12}
          minZoom={12}
          autoFit
        >
          <MarkerRenderer onMarkerClicked={onMarkerClicked} items={items} />
          {activeMarker && (
            <InfoWindow
              content={infoWindowData}
              position={infoWindowLocation}
            />
          )}
        </GoogleMap>
      </Wrapper>
    </div>
  );
}

export default MyMap;
