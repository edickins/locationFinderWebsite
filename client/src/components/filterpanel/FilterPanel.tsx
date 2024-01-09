import { useSearchParams } from 'react-router-dom';
import FilterPanelNav from './FilterPanelNav';
import FiltersContainer from './FiltersContainer';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';
import FindNearestLocationPanel from './FindNearestLocationPanel';
import { useLocationsContext } from '../../context/locationContext/locationsContext';
import { LocationActionEnum } from '../../reducer/locationReducer/types';

type Props = {
  locationBounds: google.maps.LatLngBounds | undefined;
  nearestLocationID: string | undefined;
};

function FilterPanel({ locationBounds, nearestLocationID }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dispatchFilters } = useFiltersContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dispatchLocations } = useLocationsContext();

  // handler for 'Find a toilet near me' button
  const handleFindToiletButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          if (locationBounds?.contains(pos) === false) {
            // pos is outside of the bounds of all the map location Markers
            // display message and relocate to default position

            dispatchLocations({
              type: LocationActionEnum.SET_ERROR,
              payload: {
                messageTitle: 'Geolocation detection',
                message:
                  'Sorry, but your location is outside of the area covered by this application.'
              }
            });
          } else {
            const newSearchParams = new URLSearchParams(
              searchParams.toString()
            );
            newSearchParams.set('userLocation', JSON.stringify(pos));
            if (nearestLocationID) {
              newSearchParams.set('locationID', nearestLocationID);
            }
            setSearchParams(newSearchParams);
            dispatchFilters({ type: FiltersActionEnum.HIDE_FILTER_PANEL });
          }
        },
        (error) => {
          // TODO handle any errors
          // handleLocationError(true, infoWindow, map.getCenter()!);
          console.log(error);
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
      id='filter-panel-wrapper'
      className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 mx-auto justify-between md:flex md:max-w-6xl
       '
    >
      <div
        id='filter-panel'
        className=' pointer-events-none relative mt-10 md:left-4  md:mt-24 md:max-w-md  '
      >
        <FilterPanelNav
          handleFindToiletButtonClick={handleFindToiletButtonClick}
        />
        <FiltersContainer />
      </div>
      <div
        id='find-nearest-panel'
        className=' pointer-events-none relative mt-10 hidden md:right-4 md:mt-24 md:block'
      >
        <FindNearestLocationPanel
          handleFindToiletButtonClick={handleFindToiletButtonClick}
        />
      </div>
    </div>
  );
}

export default FilterPanel;
