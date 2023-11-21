import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ILocation } from '../../../context/locationContext/types';
import MultiMarker, { IMultiMarkerRef } from './MultiMarker';

type Props = {
  items: ILocation[];
  mapMarkerRefs: React.MutableRefObject<IMultiMarkerRef[]>;
};

const checkForActiveFilter = (item: ILocation, filters: string[]): boolean => {
  if (filters.length === 0) return false;
  return item.facilities.some((facility) =>
    filters.includes(facility.short_name)
  );
};

function MarkerRenderer({ items, mapMarkerRefs }: Props) {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<string>(
    searchParams.get('filters') || ''
  );

  // udpate the list of active filters based on searchParams
  useEffect(() => {
    const searchParamsFilters = searchParams.get('filters') || '';

    // decode the filters from the URL
    const decodedSearchParamsFilters = decodeURIComponent(searchParamsFilters);

    // setFilters if the decodedSearchParamsFilters are different from the filters
    // set by useSearchParams() hook onload.
    if (decodedSearchParamsFilters !== decodeURIComponent(filters)) {
      setFilters(decodedSearchParamsFilters);
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
        data-testid={`marker-${item.id}`}
        mapMarkerRefs={mapMarkerRefs}
      />
    );
  });
}

export default MarkerRenderer;
