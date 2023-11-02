import { useState } from 'react';
import DetailPanel from '../components/detailpanel/DetailPanel';
import FilterPanel from '../components/filterpanel/FilterPanel';
import MyMap from '../components/googlemaps/MyMap';
import { useToiletsContext } from '../context/toiletContext/toiletsContext';
import { IToilet } from '../context/toiletContext/types';

function Home() {
  const [detailPanelItem, setDetailPanelItem] = useState<IToilet | undefined>();
  const [nearestAlternativeItem, setNearestAlternativeItem] = useState<
    IToilet | undefined
  >();
  const [showPanel, setShowPanel] = useState(false);

  const {
    state: { toilets }
  } = useToiletsContext();

  const setSelectedItemDetailID = (id: string | null) => {
    const selectedItem = toilets.find((toilet) => toilet.id === id);
    setDetailPanelItem(selectedItem);
    setNearestAlternativeItem(
      toilets.find((toilet) => toilet.id === selectedItem?.nearest_alternative)
    );
    setShowPanel(id ? true : false);
  };
  return (
    <div className='relative'>
      <MyMap
        items={toilets}
        setSelectedItemDetailID={setSelectedItemDetailID}
      />
      <FilterPanel />

      <DetailPanel
        item={detailPanelItem}
        nearestAlternativeItem={nearestAlternativeItem}
        showPanel={showPanel}
      />
    </div>
  );
}

export default Home;
