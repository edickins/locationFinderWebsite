import React from 'react';
import { ILocation } from '../../context/locationContext/types';

type Props = {
  location: ILocation;
};

function SearchResultItem({ location }: Props) {
  return <div>{location && location.long_name}</div>;
}

export default SearchResultItem;
