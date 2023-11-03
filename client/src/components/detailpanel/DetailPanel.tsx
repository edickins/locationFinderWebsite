import { useEffect, useRef, useState } from 'react';
import { IFacility, IToilet } from '../../context/toiletContext/types';
import { prefixHash } from '../../utils/simpleHash';

type Props = {
  item: IToilet | undefined;
  nearestAlternativeItem: IToilet | undefined;
  showPanel: boolean;
};

function DetailPanel({ item, nearestAlternativeItem, showPanel }: Props) {
  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [openingHours, setOpeningHours] = useState<string[]>([]);
  const [formatedModifiedDate, setFormatedModifiedDate] = useState<string>();

  useEffect(() => {
    if (item) {
      setFacilities(item.facilities);
      setOpeningHours(item.opening_hours);
      const modifiedDate = new Date(item.date_modified!);
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      setFormatedModifiedDate(
        new Intl.DateTimeFormat('en-US', options).format(modifiedDate)
      );
    }
  }, [item]);

  const detailPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showPanel) {
      detailPanelRef.current?.classList.add(`translate-y-1/8`);
      detailPanelRef.current?.classList.remove('translate-y-full');
    } else {
      detailPanelRef.current?.classList.add('translate-y-full');
      detailPanelRef.current?.classList.remove('translate-y-1/8');
    }
  }, [showPanel]);

  return (
    <div
      ref={detailPanelRef}
      className={`translate-all fixed bottom-0 grid h-1/2 w-full translate-y-full transform auto-rows-min gap-4 bg-dark-panel p-8 transition-transform duration-1000 ease-in-out sm:grid-cols-1 md:grid-cols-3 md:p-12`}
    >
      {item && (
        <div>
          {' '}
          <h1 className='text-xl font-bold dark:text-dark-primary-color'>
            {item.long_name}
          </h1>
          <p>Address: {item.formatted_address}</p>
          <p>
            This toilet is currently {item.open_status}. Please check daily
            opening times.
          </p>
          <section>
            <h2 className=' text-lg font-medium dark:text-dark-primary-color'>
              Facilities at this toilet:
            </h2>
            <ul className='list-none'>
              {facilities.map((facility) => (
                <li key={facility.id} className='ml-4'>
                  {facility.full_name}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className='dark:text-dark-primary-color'>Opening hours:</h2>
            <ul>
              {openingHours.map((hours) => {
                const key = prefixHash(item.id, hours);
                return <li key={key}>{hours}</li>;
              })}
            </ul>
          </section>
          <p className='text-xs dark:text-dark-secondary-color'>
            This information was last modified on {formatedModifiedDate}
          </p>
        </div>
      )}
    </div>
  );
}

export default DetailPanel;
