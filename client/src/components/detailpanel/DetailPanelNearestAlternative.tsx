import { ILocation } from '../../context/locationContext/types';
import FilterButton from '../buttons/FilterButton';

type Props = {
  item: ILocation | undefined;
  onNearestAlternativeClick: (id: string | undefined) => void;
};

function DetailPanelNearestAlternative({
  item,
  onNearestAlternativeClick
}: Props) {
  if (!item) return null;

  return (
    <section id='nearest-alternative-section'>
      <h1 className='mb-4 text-lg font-bold'>
        <p className='font-semibold'>Nearest alternative: </p>

        <FilterButton
          icon='fa-map-location-dot'
          onClick={() => onNearestAlternativeClick(item.id)}
        >
          <span className='text-xs'>{`${item.long_name} (click to see on map) `}</span>
        </FilterButton>
      </h1>
    </section>
  );
}

export default DetailPanelNearestAlternative;
