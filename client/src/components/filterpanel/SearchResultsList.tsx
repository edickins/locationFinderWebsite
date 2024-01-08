import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchResultItem from './SearchResultItem';
import { ILocation } from '../../context/locationContext/types';
import { useLocationsContext } from '../../context/locationContext/locationsContext';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';

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

function SearchResultsList() {
  const [partialMatches, setPartialMatches] = useState<ILocation[]>([]);
  const [perfectMatches, setPerfectMatches] = useState<ILocation[]>([]);
  const [searchResults, setSearchResults] = useState<ILocation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const {
    state: { locations }
  } = useLocationsContext();

  const { matchingLocationIds, dispatchFilters } = useFiltersContext();
  const { searchTerms, searchTermsPerfectMatch } = matchingLocationIds;
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearchResultClick = (locationID: string): void => {
    // Create a new URLSearchParams instance to clone the current parameters
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Set the new locationID parameter
    newSearchParams.set('locationID', locationID);

    // Replace the search parameters - this will be picked up in MyMap
    setSearchParams(newSearchParams);

    // close the filter panel
    setTimeout(() => {
      dispatchFilters({ type: FiltersActionEnum.HIDE_FILTER_PANEL });
    }, 300);
  };

  // sideEffect when search terms are updated
  useEffect(() => {
    setPartialMatches([]);
    let matches: ILocation[] = searchTerms.reduce(
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
  }, [locations, searchTerms, searchTermsPerfectMatch]);

  // sideEffect when partial and perfect match Arrays are updated
  useEffect(() => {
    let set = new Set<ILocation>(perfectMatches);
    set = new Set([...set, ...partialMatches]);
    const uniqueIDs = Array.from(set);

    setSearchResults(uniqueIDs);
  }, [partialMatches, perfectMatches]);

  // sideEffect when the search field changes
  useEffect(() => {
    const enteredText = searchParams.get('search');
    if (enteredText) {
      setSearchTerm(enteredText);
    } else {
      setSearchTerm('');
    }
  }, [searchParams]);

  return (
    <div>
      {searchTerms.length === 0 && <NoResults searchTerm={searchTerm} />}
      {searchTerms.length !== 0 && (
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
