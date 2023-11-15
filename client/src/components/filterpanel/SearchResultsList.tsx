import React, { useEffect, useState } from 'react';
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
  const {
    state: { locations }
  } = useLocationsContext();

  useEffect(() => {
    let matches: ILocation[] = searchTermMatches.reduce(
      (acc: ILocation[], locationID) => {
        const foundLocation = locations.find(
          (location) => location.id === locationID
        );
        return foundLocation ? [...acc, foundLocation] : acc;
      },
      []
    );
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

  return (
    <div>
      {searchTermPerfectMatches.length === 0 &&
        searchTermMatches.length === 0 && <NoResults />}
      {searchTermPerfectMatches.length > 0 &&
        partialMatches.map((location) => {
          return <SearchResultItem key={location.id} location={location} />;
        })}
      {perfectMatches.length > 0 &&
        perfectMatches.map((location) => {
          return <SearchResultItem key={location.id} location={location} />;
        })}
    </div>
  );
}

export default SearchResultsList;
