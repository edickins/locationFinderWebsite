import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  showPanel: boolean;
};

function DetailPanel({ item, nearestAlternativeItem, showPanel }: Props) {
  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [openingHours, setOpeningHours] = useState<string[]>([]);
  const [formatedModifiedDate, setFormatedModifiedDate] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
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

  const doShowPanel = () => {
    detailPanelRef.current?.classList.add(`translate-y-1/8`);
    detailPanelRef.current?.classList.remove('translate-y-full');
  };

  const doHidePanel = useCallback(() => {
    function clearLocationID() {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      // delete the locationID searchParam
      newSearchParams.delete('locationID');
      // Replace the search parameters - this will be picked up in MyMap and Home
      setSearchParams(newSearchParams);
    }
    if (detailPanelRef.current) {
      clearLocationID();
      detailPanelRef.current.scrollTop = 0;
      detailPanelRef.current?.classList.add('translate-y-full');
      detailPanelRef.current?.classList.remove('translate-y-1/8');
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (showPanel && detailPanelRef.current) {
      doShowPanel();
    } else if (!showPanel && detailPanelRef.current) {
      doHidePanel();
    }
  }, [doHidePanel, showPanel]);

  return (
    <div
      id='detail-panel-container'
      ref={detailPanelRef}
      className='fixed bottom-0  h-1/2 w-full translate-y-full transform auto-rows-min gap-4 overflow-y-scroll border-t border-gray-600 bg-light-panel-secondary bg-opacity-80 p-8 transition-transform duration-1000 ease-in-out dark:bg-dark-panel  md:p-8'
    >
      {item && (
        <div id='detail-panel' className=''>
          <div className='flex justify-end'>
            <ClosePanelButton onClick={doHidePanel} isPanelOpen />
          </div>
          <div className='grid sm:grid-cols-1 md:grid-cols-3 md:gap-8'>
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
