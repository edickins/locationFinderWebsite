import { useEffect, useRef, useState } from 'react';
import { IFacility, IToilet } from '../../context/toiletContext/types';

import DetailPanelAddress from './DetailPanelAddress';
import DetailPanelFacilities from './DetailPanelFacilities';
import DetailPanelOpeningTimes from './DetailPanelOpeningTimes';
import DetailPanelDateModified from './DetailPanelDateModified';
import DetailPanelNearestAlternative from './DetailPanelNearestAlternative';

type Props = {
  item: IToilet | undefined;
  nearestAlternativeItem: IToilet | undefined;
  showPanel: boolean;
  onNearestAlternativeClick: (id: string | undefined) => void;
};

function DetailPanel({
  item,
  nearestAlternativeItem,
  showPanel,
  onNearestAlternativeClick
}: Props) {
  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [openingHours, setOpeningHours] = useState<string[]>([]);
  const [formatedModifiedDate, setFormatedModifiedDate] = useState<string>();
  const detailPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item) {
      setFacilities(item.facilities);
      setOpeningHours(item.opening_hours);
      const modifiedDate = item.date_modified
        ? new Date(item.date_modified)
        : new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      setFormatedModifiedDate(
        new Intl.DateTimeFormat('en-US', options).format(modifiedDate)
      );

      // reset scrolling on the panel
      if (detailPanelRef.current) {
        detailPanelRef.current.scrollTop = 0;
      }
    }
  }, [item]);

  useEffect(() => {
    if (showPanel && detailPanelRef.current) {
      detailPanelRef.current?.classList.add(`translate-y-1/8`);
      detailPanelRef.current?.classList.remove('translate-y-full');
    } else if (!showPanel && detailPanelRef.current) {
      detailPanelRef.current.scrollTop = 0;
      detailPanelRef.current?.classList.add('translate-y-full');
      detailPanelRef.current?.classList.remove('translate-y-1/8');
    }
  }, [showPanel]);

  return (
    <div
      id='detail-panel-container'
      ref={detailPanelRef}
      className='translate-all fixed bottom-0 grid h-1/2 w-full translate-y-full transform auto-rows-min gap-4 overflow-y-scroll bg-dark-panel p-8 transition-transform duration-1000 ease-in-out sm:grid-cols-1 md:grid-cols-3 md:p-12'
    >
      {item && (
        <div id='detail-panel'>
          <DetailPanelAddress item={item} />
          <DetailPanelFacilities facilities={facilities} />
          <DetailPanelOpeningTimes openingHours={openingHours} item={item} />
          <DetailPanelNearestAlternative
            item={nearestAlternativeItem}
            onNearestAlternativeClick={onNearestAlternativeClick}
          />
          <DetailPanelDateModified
            formatedModifiedDate={formatedModifiedDate}
          />
        </div>
      )}
    </div>
  );
}

export default DetailPanel;
