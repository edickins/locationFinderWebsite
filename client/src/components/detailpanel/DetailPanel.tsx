import { useCallback, useEffect, useRef, useState } from 'react';
import { IFacility, ILocation } from '../../context/locationContext/types';

import DetailPanelAddress from './DetailPanelAddress';
import DetailPanelFacilities from './DetailPanelFacilities';
import DetailPanelOpeningTimes from './DetailPanelOpeningTimes';
import DetailPanelDateModified from './DetailPanelDateModified';
import DetailPanelNearestAlternative from './DetailPanelNearestAlternative';
import ClosePanelButton from '../buttons/ClosePanelButton';

type Props = {
  item: ILocation | undefined;
  nearestAlternativeItem: ILocation | undefined;
};

function DetailPanel({ item, nearestAlternativeItem }: Props) {
  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [openingHours, setOpeningHours] = useState<string[]>([]);
  const [formatedModifiedDate, setFormatedModifiedDate] = useState<string>();

  const detailPanelRef = useRef<HTMLDivElement>(null);

  console.log(item?.long_name);

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

  const doShowPanel = useCallback(() => {
    detailPanelRef.current?.classList.add(`translate-y-0`);
    detailPanelRef.current?.classList.remove('translate-y-full');
  }, []);

  const doHidePanel = useCallback(() => {
    if (detailPanelRef.current) {
      detailPanelRef.current.scrollTop = 0;
      detailPanelRef.current?.classList.add('translate-y-full');
      detailPanelRef.current?.classList.remove('translate-y-0');
    }
  }, []);

  useEffect(() => {
    if (item && detailPanelRef.current) {
      doShowPanel();
    } else if (!item && detailPanelRef.current) {
      doHidePanel();
    }
  }, [doHidePanel, doShowPanel, item]);

  return (
    <div
      id='detail-panel-container'
      ref={detailPanelRef}
      className='fixed bottom-0 w-full  translate-y-full transform auto-rows-min gap-4  border-t border-gray-600 bg-light-panel-secondary  bg-opacity-80 pb-2 pl-4 transition-transform duration-1000 ease-in-out dark:bg-dark-panel md:px-8 md:py-8 '
    >
      {item && (
        <div
          id='detail-panel'
          className='max-h-45vh overflow-y-scroll md:overflow-visible'
        >
          <div className='sticky top-4 flex justify-end'>
            <ClosePanelButton onClick={doHidePanel} isPanelOpen />
          </div>
          <div className='mr-8 grid grid-cols-1 text-sm md:grid-cols-7 md:gap-8 md:text-base'>
            <DetailPanelAddress item={item} />
            <DetailPanelFacilities facilities={facilities} />
            <DetailPanelOpeningTimes openingHours={openingHours} item={item} />
            <DetailPanelNearestAlternative item={nearestAlternativeItem} />
            <DetailPanelDateModified
              formatedModifiedDate={formatedModifiedDate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPanel;
