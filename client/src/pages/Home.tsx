import FilterPanel from '../components/filterpanel/FilterPanel';
import MyMap from '../components/googlemaps/MyMap';
import { useToiletsContext } from '../context/toiletContext/toiletsContext';

function Home() {
  const {
    state: { toilets }
  } = useToiletsContext();
  return (
    <div className='relative'>
      <MyMap items={toilets} />
      <FilterPanel />
    </div>
  );
}

export default Home;
