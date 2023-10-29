import { useState } from 'react';
import FilterPanel from '../components/filterpanel/FilterPanel';
import MyMap from '../components/googlemaps/MyMap';
import { useToiletsContext } from '../context/toiletContext/toiletsContext';

function Home() {
  const [filteredFacilities, setFilteredFacilities] = useState<string[]>([]);

  const onFilterClicked = (facility: string, isSelected: boolean) => {
    if (isSelected && !filteredFacilities.includes(facility)) {
      setFilteredFacilities(() => {
        return [...filteredFacilities, facility];
      });
    }

    if (!isSelected && filteredFacilities.includes(facility)) {
      setFilteredFacilities((prev) => {
        return prev.filter((item) => {
          return item != facility;
        });
      });
    }
  };

  const {
    state: { toilets }
  } = useToiletsContext();
  return (
    <div className='relative'>
      <MyMap items={toilets} />
      <FilterPanel
        filteredFacilities={filteredFacilities}
        onFilterClicked={onFilterClicked}
      />
    </div>
  );
}

export default Home;
