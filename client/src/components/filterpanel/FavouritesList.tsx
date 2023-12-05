import { useSearchParams } from 'react-router-dom';
import SearchResultItem from './SearchResultItem';
import { ILocation } from '../../context/locationContext/types';
import { useLocationsContext } from '../../context/locationContext/locationsContext';

function NoResults() {
  return <p>No favourites found.</p>;
}

function FavouritesList() {
  const {
    state: { locations }
  } = useLocationsContext();

  let favourites = locations.map((location: ILocation) => {
    return location.isFavourite ? location : null;
  });

  favourites = favourites.filter(Boolean);

  const [searchParams, setSearchParams] = useSearchParams();

  const onFavouriteClicked = (locationID: string): void => {
    // Create a new URLSearchParams instance to clone the current parameters
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Set the new locationID parameter
    newSearchParams.set('locationID', locationID);

    // Replace the search parameters - this will be picked up in MyMap
    setSearchParams(newSearchParams);
  };

  return (
    <div>
      {favourites.length === 0 && <NoResults />}
      {favourites.length !== 0 && (
        <ul className='mt-2 bg-white bg-opacity-80 px-2 py-2 dark:text-gray-900'>
          {favourites.length > 0 &&
            favourites.map((location) => {
              if (location) {
                return (
                  <SearchResultItem
                    key={location.id}
                    location={location}
                    onItemClick={onFavouriteClicked}
                  />
                );
              }
              return null;
            })}
        </ul>
      )}
    </div>
  );
}

export default FavouritesList;
