import { useState } from 'react';
import DetailPanel from '../components/detailpanel/DetailPanel';
import FilterPanel from '../components/filterpanel/FilterPanel';
import MyMap from '../components/googlemaps/MyMap';
import { useToiletsContext } from '../context/toiletContext/toiletsContext';
import { IToilet } from '../context/toiletContext/types';
import { IMultiMarkerRef } from '../components/googlemaps/components/MultiMarker';

function Home() {
  const [detailPanelItem, setDetailPanelItem] = useState<IToilet | undefined>();
  const [nearestAlternativeItem, setNearestAlternativeItem] = useState<
    IToilet | undefined
  >();
  const [showPanel, setShowPanel] = useState(false);
  const [googlemapMarkerRefs, setGooglemapMarkerRefs] = useState<
    IMultiMarkerRef[]
  >([]);
  const [userLocation, setUserLocation] = useState<
    { lat: number; lng: number } | undefined
  >();

  const {
    state: { toilets }
  } = useToiletsContext();

  const setSelectedItemDetailID = (id: string | null) => {
    const selectedItem = toilets.find((toilet) => toilet.id === id);
    if (selectedItem) {
      setDetailPanelItem(selectedItem);
      setNearestAlternativeItem(
        toilets.find(
          (toilet) => toilet.id === selectedItem?.nearest_alternative
        )
      );
    }
    setShowPanel(id && selectedItem ? true : false);
  };

  const handleNearestAlternativeClick = (id: string | undefined) => {
    const alternativeItem = googlemapMarkerRefs.find(
      (i): i is IMultiMarkerRef => i.id === id
    );
    if (alternativeItem?.marker) {
      // trigger the click event on the google.maps.Marker for the alternative
      google.maps.event.trigger(alternativeItem.marker, 'click');
    }
  };

  const handleFindToiletButtonClick = () => {
    console.log('handleFindToiletButtonClick');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          setUserLocation(pos);
        },
        () => {
          // handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter()!);
    }
  };

  return (
    <main className='absolute bottom-0 top-16 w-full' id='home-container'>
      <MyMap
        items={toilets}
        setSelectedItemDetailID={setSelectedItemDetailID}
        setShowPanel={setShowPanel}
        setGooglemapMarkerRefs={setGooglemapMarkerRefs}
        userLocation={userLocation}
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
