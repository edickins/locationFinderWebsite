import Location from '../components/Location';
import { useLocationsContext } from '../context/locationContext/locationsContext';

function Locations() {
  const {
    state: { locations }
  } = useLocationsContext();
  return (
    <div>
      <h3>toilets</h3>
      {locations.map((location) => {
        return <Location location={location} key={location.id} />;
      })}
    </div>
  );
}

export default Locations;
