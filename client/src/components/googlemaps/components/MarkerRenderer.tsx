import { memo } from 'react';

import { ILocation } from '../../../context/locationContext/types';
import MultiMarker from './MultiMarker';

type Props = {
  items: ILocation[];
  activeFilters: string | null | undefined;
  onMarkerClicked: (id: string) => void;
};

const checkForActiveFilter = (item: ILocation, filters: string[]): boolean => {
  if (filters.length === 0) return false;
  return item.facilities.some((facility) =>
    filters.includes(facility.short_name)
  );
};

function MarkerRenderer({ items, activeFilters, onMarkerClicked }: Props) {
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
        onMarkerClicked={onMarkerClicked}
      />
    );
  });
}

export default memo(MarkerRenderer);
