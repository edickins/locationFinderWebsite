import { ILocation } from '../../context/locationContext/types';
import { prefixHash } from '../../utils/simpleHash';

type Props = {
  openingHours: string[];
  item: ILocation;
};

function DetailPanelOpeningTimes({ openingHours, item }: Props) {
  return (
    <section id='opening-hours-section' className='mb-4'>
      <h2 className='font-semibold  dark:text-dark-primary-color'>
        Opening hours:
      </h2>
      <ul>
        {openingHours.map((hours) => {
          const key = prefixHash(item.id, hours);
          return <li key={key}>{hours}</li>;
        })}
      </ul>
    </section>
  );
}

export default DetailPanelOpeningTimes;
