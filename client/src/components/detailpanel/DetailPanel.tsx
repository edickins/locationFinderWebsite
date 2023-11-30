import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IFacility, ILocation } from '../../context/locationContext/types';

import DetailPanelAddress from './DetailPanelAddress';
import DetailPanelFacilities from './DetailPanelFacilities';
import DetailPanelOpeningTimes from './DetailPanelOpeningTimes';
import DetailPanelDateModified from './DetailPanelDateModified';
import DetailPanelNearestAlternative from './DetailPanelNearestAlternative';
import ClosePanelButton from '../buttons/ClosePanelButton';
import useGetScreensize, { ScreenSizeEnum } from '../../hooks/getScreensize';

type Props = {
  item: ILocation | undefined;
  nearestAlternativeItem: ILocation | undefined;
};

function DetailPanel({ item, nearestAlternativeItem }: Props) {
  const screenSize = useGetScreensize();
  const translateClassSmall = 'translate-y-4';
  const translateClassLarge = 'translate-y-1/4';

  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [openingHours, setOpeningHours] = useState<string[]>([]);
  const [formatedModifiedDate, setFormatedModifiedDate] = useState<string>();
  const [translateYClass, setTranslateYClass] =
    useState<string>(translateClassSmall);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!screenSize) return;
    switch (screenSize) {
      case ScreenSizeEnum.XS:
      case ScreenSizeEnum.SM:
        setTranslateYClass(translateClassSmall);
        break;
      case ScreenSizeEnum.LG:
      case ScreenSizeEnum.MD:
      case ScreenSizeEnum.XL:
        setTranslateYClass(translateClassLarge);
        break;
      default:
        setTranslateYClass(translateClassSmall);
    }
  }, [screenSize]);

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
    console.log('doShowPanel');
    detailPanelRef.current?.classList.add(translateYClass);
    detailPanelRef.current?.classList.remove('translate-y-full');
  }, [translateYClass]);

  const doHidePanel = useCallback(() => {
    if (detailPanelRef.current) {
      detailPanelRef.current.scrollTop = 0;
      detailPanelRef.current?.classList.add('translate-y-full');
      detailPanelRef.current?.classList.remove(translateClassSmall);
      detailPanelRef.current?.classList.remove(translateClassLarge);
    }
  }, []);

  useEffect(() => {
    if (item && detailPanelRef.current) {
      console.log('doShowPanel');
      doShowPanel();
    } else if (!item && detailPanelRef.current) {
      console.log('doHidePanel');
      doHidePanel();
    }
  }, [doHidePanel, doShowPanel, item]);

  return (
    <div
      id='detail-panel-container'
      ref={detailPanelRef}
      className='fixed bottom-0  h-2/3 w-full translate-y-full transform auto-rows-min gap-4 overflow-y-scroll border-t border-gray-600 bg-light-panel-secondary  bg-opacity-80 px-4 pb-8 transition-transform duration-1000 ease-in-out dark:bg-dark-panel md:p-8 '
    >
      {item && (
        <div id='detail-panel'>
          <div className='sticky top-4 flex justify-end'>
            <ClosePanelButton onClick={doHidePanel} isPanelOpen />
          </div>
          <div className='mr-8 grid text-sm sm:grid-cols-1 md:grid-cols-3 md:gap-8 md:text-base'>
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
