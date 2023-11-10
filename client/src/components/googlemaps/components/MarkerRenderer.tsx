import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IToilet } from '../../../context/toiletContext/types';
import MultiMarker, { IMultiMarkerRef } from './MultiMarker';

type Props = {
  items: IToilet[];
  onMarkerClicked: (id: string) => void;
  mapMarkerRefs: React.MutableRefObject<IMultiMarkerRef[]>;
};

const checkForActiveFilter = (item: IToilet, filters: string[]): boolean => {
  if (filters.length === 0) return false;
  return item.facilities.some((facility) =>
    filters.includes(facility.short_name)
  );
};

function MarkerRenderer({ items, onMarkerClicked, mapMarkerRefs }: Props) {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<string>(
    searchParams.get('filters') || ''
  );

  // udpate the list of active filters based on searchParams
  useEffect(() => {
    const windowSearch = decodeURIComponent(window.location.search);
    let windowSearchFilters = '';
    if (windowSearch.indexOf('?filters=') > -1) {
      windowSearchFilters = windowSearch.substring(9);
    }

    // setFilters if the window.location.search is different from the filters
    // set by useSearchParams() hook onload.
    if (windowSearchFilters !== decodeURIComponent(filters)) {
      setFilters(windowSearchFilters);
    }
  }, [searchParams, filters]);

  if (!items || items.length === 0) return null;

  const arr = filters?.split('+') || [];
  return items.map((item) => {
    const filterIsActive = checkForActiveFilter(item, arr);
    return (
      <MultiMarker
        key={item.id}
        position={item.geometry.location}
        id={item.id}
        isFilterActive={filterIsActive}
        isFavourite={item.isFavourite}
        open_status={item.open_status}
        onMarkerClicked={onMarkerClicked}
        data-testid={`marker-${item.id}`}
        mapMarkerRefs={mapMarkerRefs}
      />
    );
  });
}

export default MarkerRenderer;
