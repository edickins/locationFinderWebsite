import { ILocation } from '../../context/locationContext/types';
import { prefixHash } from '../../utils/simpleHash';

type Props = {
  openingHours: string[];
  item: ILocation;
};

function DetailPanelOpeningTimes({ openingHours, item }: Props) {
  const regEx = /closed/i;
  const isClosed = item?.open_status.match(regEx);
  return (
    <section
      id='opening-hours-section'
      className='cols-span-1 mb-4 md:col-span-2 md:mb-0'
    >
      <h2 className='font-semibold text-light-primary-color dark:text-dark-primary-color'>
        Opening hours:
      </h2>
      {isClosed && <p>This toilet is currently closed and not in service.</p>}
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
