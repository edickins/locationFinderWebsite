import MyMap from '../components/googlemaps/MyMap';
import { useToiletsContext } from '../context/toiletContext/toiletsContext';

function Home() {
  const {
    state: { toilets }
  } = useToiletsContext();
  return (
    <div>
      <MyMap items={toilets} />
    </div>
  );
}

export default Home;
