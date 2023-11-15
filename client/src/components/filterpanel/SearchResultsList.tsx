import { useEffect, useState } from 'react';
import SearchResultItem from './SearchResultItem';
import { ILocation } from '../../context/locationContext/types';
import { useLocationsContext } from '../../context/locationContext/locationsContext';

type Props = {
  searchTermMatches: string[];
  searchTermPerfectMatches: string[];
};

function NoResults() {
  return <p>No results found.</p>;
}

function SearchResultsList({
  searchTermMatches,
  searchTermPerfectMatches
}: Props) {
  const [partialMatches, setPartialMatches] = useState<ILocation[]>([]);
  const [perfectMatches, setPerfectMatches] = useState<ILocation[]>([]);
  const [searchResults, setSearchResults] = useState<ILocation[]>([]);
  const {
    state: { locations }
  } = useLocationsContext();

  // sideEffect when search terms are updated
  useEffect(() => {
    setPartialMatches([]);
    let matches: ILocation[] = searchTermMatches.reduce(
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
    matches = searchTermPerfectMatches.reduce(
      (acc: ILocation[], locationID) => {
        const foundLocation = locations.find(
          (location) => location.id === locationID
        );
        return foundLocation ? [...acc, foundLocation] : acc;
      },
      []
    );
    setPerfectMatches(matches);
  }, [locations, searchTermMatches, searchTermPerfectMatches]);

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
      {searchTermPerfectMatches.length === 0 &&
        searchTermMatches.length === 0 && <NoResults />}
      {searchResults.length > 0 &&
        searchResults.map((location) => {
          return <SearchResultItem key={location.id} location={location} />;
        })}
    </div>
  );
}

export default SearchResultsList;
