import Toilet from '../components/Toilet';
import { useToiletsContext } from '../context/toiletContext/toiletsContext';

function Toilets() {
  const {
    state: { toilets }
  } = useToiletsContext();
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
