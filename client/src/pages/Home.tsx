import Filter from '../components/Filter';
import MyMap from '../components/googlemaps/MyMap';
import { useToiletsContext } from '../context/toiletContext/toiletsContext';

function Home() {
  const {
    state: { toilets }
  } = useToiletsContext();
  return (
    <div className='relative'>
      <MyMap items={toilets} />
      <Filter />
    </div>
  );
}

export default Home;
