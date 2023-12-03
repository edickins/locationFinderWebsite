import { useEffect, memo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ILocation } from '../../../context/locationContext/types';
import MultiMarker, { IMultiMarkerRef } from './MultiMarker';

type Props = {
  items: ILocation[];
  mapMarkerRefs: React.MutableRefObject<IMultiMarkerRef[]>;
  activeFilters: string | null | undefined;
  onMarkerClicked: (id: string) => void;
};

const checkForActiveFilter = (item: ILocation, filters: string[]): boolean => {
  if (filters.length === 0) return false;
  return item.facilities.some((facility) =>
    filters.includes(facility.short_name)
  );
};

function MarkerRenderer({
  items,
  mapMarkerRefs,
  activeFilters,
  onMarkerClicked
}: Props) {
  const [searchParams] = useSearchParams();
  const filtersRef = useRef<string | null | undefined>();

  // udpate the list of active filters based on searchParams
  useEffect(() => {
    const searchParamsFilters = searchParams.get('filters') || '';

    // Only call setFilters if searchParamsFilters and filters are different
    if (searchParamsFilters !== filtersRef.current) {
      // Decode the filters from the URL
      const decodedSearchParamsFilters =
        decodeURIComponent(searchParamsFilters);

      filtersRef.current = decodedSearchParamsFilters;
    }
  }, [searchParams]);

  if (!items || items.length === 0) return null;

  const arr = activeFilters?.split('+') || [];
  return items.map((item) => {
    // TODO maybe checking for active filters earlier would reduce renders?
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
        onMarkerClicked={onMarkerClicked}
      />
    );
  });
}

export default memo(MarkerRenderer);
