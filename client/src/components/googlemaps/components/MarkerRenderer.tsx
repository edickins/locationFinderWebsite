import { useSearchParams } from 'react-router-dom';
import { IToilet } from '../../../context/toiletContext/types';
import MultiMarker from './MultiMarker';
import { useEffect, useState } from 'react';

type Props = {
  items: IToilet[];
  onMarkerClicked: (id: string) => void;
};

const checkForActiveFilter = (item: IToilet, filters: string[]): boolean => {
  if (filters.length === 0) return false;
  return item.facilities.some((facility) =>
    filters.includes(facility.short_name)
  );
};

function MarkerRenderer({ items, onMarkerClicked }: Props) {
  const [markerElements, setMarkerElements] = useState<JSX.Element[]>([]);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<string>(
    searchParams.get('filters') || ''
  );

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
  }, [window.location.search]);

  useEffect(() => {
    if (!items) return;
    let arr = filters?.split('+') || [];
    const markers = items.map((item) => {
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
        />
      );
    });

    setMarkerElements(markers);
  }, [filters, items]);

  return markerElements;
}

export default MarkerRenderer;
