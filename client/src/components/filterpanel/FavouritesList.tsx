import SearchResultItem from './SearchResultItem';
import { ILocation } from '../../context/locationContext/types';

function NoResults() {
  return (
    <p>
      No favourites found. Click the{' '}
      <i
        className='fa-star far dark:text-dark-secondary-color hover:dark:text-dark-primary-color'
        aria-hidden='true'
      />{' '}
      next to a location name in the bottom panel to add a favourite to this
      list.
    </p>
  );
}

type Props = {
  favourites: (ILocation | null)[];
  updateSearchParams: (key: string, value: string) => void;
};

function FavouritesList({ favourites, updateSearchParams }: Props) {
  const onFavouriteClicked = (locationID: string): void => {
    updateSearchParams('locationID', locationID);
  };

  if (!favourites) return null;
  if (favourites.length === 0) {
    return <NoResults />;
  }

  return (
    <div>
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
