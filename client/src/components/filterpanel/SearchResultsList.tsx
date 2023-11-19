import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchResultItem from './SearchResultItem';
import { ILocation } from '../../context/locationContext/types';
import { useLocationsContext } from '../../context/locationContext/locationsContext';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';

function NoResults() {
  return <p>No results found.</p>;
}

function SearchResultsList() {
  const [partialMatches, setPartialMatches] = useState<ILocation[]>([]);
  const [perfectMatches, setPerfectMatches] = useState<ILocation[]>([]);
  const [searchResults, setSearchResults] = useState<ILocation[]>([]);
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
    dispatchFilters({ type: FiltersActionEnum.HIDE_FILTER_PANEL });
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
    const sortPerfectMatches = () => {
      let results: ILocation[] = [];
      if (perfectMatches.length > 0) {
        results = perfectMatches.slice(0, 9);
      }

      return results;
    };

    const sortPartialMatches = () => {
      let results: ILocation[] = [];
      if (perfectMatches.length < 5) {
        results = partialMatches.slice(0, 5);
      }
      return results;
    };

    let results = sortPerfectMatches();
    results = results.concat(sortPartialMatches());

    setSearchResults(results);
  }, [partialMatches, perfectMatches]);

  return (
    <div>
      {searchTerms.length === 0 && searchTermsPerfectMatch.length === 0 && (
        <NoResults />
      )}
      {searchResults.length > 0 &&
        searchResults.map((location) => {
          return (
            <SearchResultItem
              key={location.id}
              location={location}
              onSearchResultClick={onSearchResultClick}
            />
          );
        })}
    </div>
  );
}

export default SearchResultsList;
