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

  const onNearestAlternativeClick = (id: string | undefined) => {
    const alternativeItem = googlemapMarkerRefs.find(
      (i): i is IMultiMarkerRef => i.id === id
    );
    if (alternativeItem?.marker) {
      // trigger the click event on the google.maps.Marker for the alternative
      google.maps.event.trigger(alternativeItem.marker, 'click');
    }
  };

  return (
    <main className='absolute bottom-0 top-16 w-full' id='home-container'>
      <MyMap
        items={toilets}
        setSelectedItemDetailID={setSelectedItemDetailID}
        setShowPanel={setShowPanel}
        setGooglemapMarkerRefs={setGooglemapMarkerRefs}
      />
      <DetailPanel
        item={detailPanelItem}
        nearestAlternativeItem={nearestAlternativeItem}
        onNearestAlternativeClick={onNearestAlternativeClick}
        showPanel={showPanel}
      />
      <FilterPanel />
    </main>
  );
}

export default Home;
