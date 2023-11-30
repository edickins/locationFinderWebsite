import { useSearchParams } from 'react-router-dom';
import FilterPanelNav from './FilterPanelNav';
import FiltersContainer from './FiltersContainer';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';

function FilterPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dispatchFilters } = useFiltersContext();

  // handler for 'Find a toilet near me' button
  const handleFindToiletButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.set('userLocation', JSON.stringify(pos));
          newSearchParams.delete('locationID');
          setSearchParams(newSearchParams);
          dispatchFilters({ type: FiltersActionEnum.HIDE_FILTER_PANEL });
        },
        () => {
          // TODO handle any errors
          // handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // TODO handle any errors
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter()!);
    }
  };

  return (
    <div
      id='filter-panel'
      className=' pointer-events-none absolute left-0  right-0 top-0 md:bottom-12 md:left-4 md:top-12 md:flex md:max-w-md  '
    >
      <div className='md:w-full '>
        <FilterPanelNav
          handleFindToiletButtonClick={handleFindToiletButtonClick}
        />
        <FiltersContainer />
      </div>
    </div>
  );
}

export default FilterPanel;
