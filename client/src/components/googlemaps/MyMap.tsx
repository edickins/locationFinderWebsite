import { useEffect, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { GoogleMap } from 'googlemaps-react-primitives';
import InfoWindow from './components/InfoWindow';
import MarkerRenderer from './components/MarkerRenderer';
import { IToilet } from '../../context/toiletContext/types';
import { IMultiMarkerRef } from './components/MultiMarker';

// import styles from './appStyles';
import styles from './multiMapStyles';

function renderLoadingStatus(status: Status) {
  return <h1>{status}</h1>;
}

type Props = {
  items: IToilet[];
  setSelectedItemDetailID: (id: string | null) => void;
  setShowPanel: (show: boolean) => void;
  setGooglemapMarkerRefs: React.Dispatch<
    React.SetStateAction<IMultiMarkerRef[]>
  >;
};

function MyMap({
  items,
  setSelectedItemDetailID,
  setShowPanel,
  setGooglemapMarkerRefs
}: Props) {
  const [activeMarker, setActiveMarker] = useState<string>('');
  const [infoWindowData, setInfoWindowData] = useState<string>('');
  const [mapStyle, setMapStyle] = useState<google.maps.MapTypeStyle[]>([]);
  const [markerClicks, setMarkerClicks] = useState(0);
  const [infoWindowLocation, setInfoWindowLocation] =
    useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });

  const onMarkerClicked = (id: string) => {
    const marker = items.find((m) => m.id === id);
    console.log(`MyMap onMarkerClicked marker`);
    if (marker) {
      setMarkerClicks((prev) => prev + 1);
      setActiveMarker(marker.id);
      setInfoWindowData(marker.long_name);
      setInfoWindowLocation(marker.geometry.location);
      setSelectedItemDetailID(marker.id);
    }
  };

  useEffect(() => {
    setMapStyle(
      window.matchMedia('(prefers-color-scheme:dark').matches
        ? styles.night
        : styles.retro
    );
  }, [window.matchMedia('(prefers-color-scheme:dark')]);

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
            setGooglemapMarkerRefs={setGooglemapMarkerRefs}
            items={items}
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
        </GoogleMap>
      </Wrapper>
    </div>
  );
}

export default MyMap;
