import { useRef, useState } from 'react';
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
  const [userLocation, setUserLocation] = useState<
    { lat: number; lng: number } | undefined
  >();

  const {
    state: { locations }
  } = useLocationsContext();

  const setSelectedItemDetailID = (id: string | null) => {
    const selectedItem = locations.find((location) => location.id === id);
    if (selectedItem) {
      setDetailPanelItem(selectedItem);
      setNearestAlternativeItem(
        locations.find(
          (toilet) => toilet.id === selectedItem?.nearest_alternative
        )
      );
    }
    setShowPanel(!!(id && selectedItem));
  };

  const handleNearestAlternativeClick = (id: string | undefined) => {
    const alternativeItem = mapMarkerRefs.current.find(
      (i): i is IMultiMarkerRef => i.id === id
    );
    if (alternativeItem?.marker) {
      // trigger the click event on the google.maps.Marker for the alternative location
      google.maps.event.trigger(alternativeItem.marker, 'click');
    }
  };

  const handleFindToiletButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          setUserLocation(pos);
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
    <main className='absolute bottom-0 top-16 w-full' id='home-container'>
      <MyMap
        items={locations}
        setSelectedItemDetailID={setSelectedItemDetailID}
        setShowPanel={setShowPanel}
        userLocation={userLocation}
        mapMarkerRefs={mapMarkerRefs}
      />
      <DetailPanel
        item={detailPanelItem}
        nearestAlternativeItem={nearestAlternativeItem}
        onNearestAlternativeClick={handleNearestAlternativeClick}
        showPanel={showPanel}
      />
      <FilterPanel handleFindToiletButtonClick={handleFindToiletButtonClick} />
    </main>
  );
}

export default Home;
