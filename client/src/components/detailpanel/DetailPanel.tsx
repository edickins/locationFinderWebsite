import { useCallback, useEffect, useRef, useState } from 'react';
import { IFacility, ILocation } from '../../context/locationContext/types';

import DetailPanelAddress from './DetailPanelAddress';
import DetailPanelFacilities from './DetailPanelFacilities';
import DetailPanelOpeningTimes from './DetailPanelOpeningTimes';
import DetailPanelDateModified from './DetailPanelDateModified';
import DetailPanelShowLocationButton from './DetailPanelShowLocationButton';
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
  const detailPanelScrollContainerRef = useRef<HTMLDivElement>(null);

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

      // make the panel visible at the bottom of the screen
      if (detailPanelRef.current) {
        detailPanelRef.current.classList.add('bottom-28');
      }
    } else {
      // hide the panel
      detailPanelRef.current?.classList.add('bottom-0');
    }
  }, [item]);

  const showPanel = useCallback(() => {
    if (detailPanelRef.current) {
      detailPanelRef.current.scrollTop = 0;
      detailPanelRef.current.classList.add(`detailPanelFullView`);
      detailPanelRef.current.classList.add(`scrollbar`);
      detailPanelRef.current.classList.remove('translate-y-full');
    }
  }, []);

  const hidePanel = useCallback(() => {
    if (detailPanelRef.current) {
      detailPanelRef.current.scrollTop = 0;
      detailPanelRef.current.classList.add('translate-y-full');
      detailPanelRef.current.classList.remove(`scrollbar`);
      detailPanelRef.current.classList.remove('detailPanelFullView');
    }
  }, []);

  const scrollToTop = () => {
    if (detailPanelScrollContainerRef.current) {
      detailPanelScrollContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div
      id='detail-panel-container'
      ref={detailPanelRef}
      className='fixed bottom-0 w-full  translate-y-full transform auto-rows-min gap-4  border-t border-gray-600 bg-light-panel-secondary bg-opacity-80 px-4 py-2 transition-transform duration-1000 ease-in-out dark:bg-dark-panel md:px-8 md:py-4 '
    >
      {item && (
        <div
          id='detail-panel'
          ref={detailPanelScrollContainerRef}
          className='max-h-45vh overflow-y-scroll md:overflow-visible'
        >
          <div className='absolute right-8'>
            <ClosePanelButton hidePanel={hidePanel} showPanel={showPanel} />
          </div>
          <div className='mr-8 grid grid-cols-1 pt-6  text-sm md:grid-cols-7 md:gap-8'>
            <DetailPanelAddress
              item={item}
              key={item.formatted_address}
              type={undefined}
              props={undefined}
            >
              <DetailPanelShowLocationButton
                item={item}
                key={item.id}
                type={undefined}
                props={undefined}
              />
            </DetailPanelAddress>
            <DetailPanelFacilities facilities={facilities} />
            <DetailPanelOpeningTimes openingHours={openingHours} item={item} />
            <DetailPanelShowLocationButton
              item={nearestAlternativeItem}
              key='nearestAlternative'
              type={undefined}
              props={undefined}
              scrollToTop={scrollToTop}
            >
              <p className='font-semibold'>Nearest alternative: </p>
            </DetailPanelShowLocationButton>
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
