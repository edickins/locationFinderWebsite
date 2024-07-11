import { useEffect, useState } from 'react';
import SearchResultItem from './SearchResultItem';
import { ILocation } from '../../context/locationContext/types';
import { useLocationsContext } from '../../context/locationContext/locationsContext';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';
import useGetScreensize, { ScreenSizeEnum } from '../../hooks/getScreensize';

function SearchTermMessage({ searchTerm }: { searchTerm: string }) {
  const msg =
    searchTerm !== ''
      ? `You searched for "${searchTerm}"`
      : 'Please enter your search in the search field above. ';

  return <p>{msg}</p>;
}

function NoResults({ searchTerm }: { searchTerm: string }) {
  return (
    <div>
      <SearchTermMessage searchTerm={searchTerm} />
      {searchTerm !== '' && <p>No search results found.</p>}
    </div>
  );
}

type Props = {
  updateSearchParams: (key: string, value: string) => void;
};

function SearchResultsList({ updateSearchParams }: Props) {
  const [partialMatches, setPartialMatches] = useState<ILocation[]>([]);
  const [perfectMatches, setPerfectMatches] = useState<ILocation[]>([]);
  const [searchResults, setSearchResults] = useState<ILocation[]>([]);
  const {
    state: { locations }
  } = useLocationsContext();
  const screenSize = useGetScreensize();

  const { searchData, dispatchFilters } = useFiltersContext();
  const { searchTermsMatch, searchTermsPerfectMatch, searchTerm } = searchData;

  const onSearchResultClick = (locationID: string): void => {
    updateSearchParams('locationID', locationID);

    // close the filter panel on small devices
    if (screenSize === ScreenSizeEnum.SM || screenSize === ScreenSizeEnum.MD) {
      setTimeout(() => {
        dispatchFilters({ type: FiltersActionEnum.HIDE_FILTER_PANEL });
      }, 300);
    }
  };

  // sideEffect when search terms are updated
  useEffect(() => {
    setPartialMatches([]);
    let matches: ILocation[] = searchTermsMatch.reduce(
      (acc: ILocation[], locationID) => {
        const foundLocation = locations.find(
          (location) => location.id === locationID
        );
        return foundLocation ? [...acc, foundLocation] : acc;
      },
      []
    );
    setPartialMatches(matches);

    setPerfectMatches([]);
    matches = searchTermsPerfectMatch.reduce((acc: ILocation[], locationID) => {
      const foundLocation = locations.find(
        (location) => location.id === locationID
      );
      return foundLocation ? [...acc, foundLocation] : acc;
    }, []);
    setPerfectMatches(matches);
  }, [locations, searchTermsMatch, searchTermsPerfectMatch]);

  // sideEffect when partial and perfect match Arrays are updated
  useEffect(() => {
    let set = new Set<ILocation>(perfectMatches);
    set = new Set([...set, ...partialMatches]);
    const uniqueIDs = Array.from(set);

    setSearchResults(uniqueIDs);
  }, [partialMatches, perfectMatches]);

  return (
    <div>
      {searchTermsMatch.length === 0 && <NoResults searchTerm={searchTerm} />}

      {searchTermsMatch.length !== 0 && (
        <div>
          <SearchTermMessage searchTerm={searchTerm} />
          <ul className='mt-2 bg-white bg-opacity-80 px-2 py-2 dark:text-gray-900'>
            {searchResults.length > 0 &&
              searchResults.map((location) => {
                return (
                  <SearchResultItem
                    key={location.id}
                    location={location}
                    onItemClick={onSearchResultClick}
                  />
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchResultsList;
