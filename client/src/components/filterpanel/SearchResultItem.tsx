import { ILocation } from '../../context/locationContext/types';

type Props = {
  location: ILocation;
  onSearchResultClick: (locationID: string) => void;
};

function SearchResultItem({ location, onSearchResultClick }: Props) {
  const onClick = () => {
    onSearchResultClick(location.id);
  };
  return (
    <button type='button' onClick={() => onClick()}>
      {location && location.long_name}
    </button>
  );
}

export default SearchResultItem;
