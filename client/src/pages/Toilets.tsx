import Toilet from '../components/Toilet';
import { useLocationsContext } from '../context/locationContext/locationsContext';

function Toilets() {
  const {
    state: { locations: toilets }
  } = useLocationsContext();
  return (
    <div>
      <h3>toilets</h3>
      {toilets.map((toilet) => {
        return <Toilet toilet={toilet} key={toilet.id} />;
      })}
    </div>
  );
}

export default Toilets;
