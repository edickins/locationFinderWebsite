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
    <li className='py-2 md:py-1'>
      <button type='button' onClick={() => onClick()}>
        {location && location.long_name}
      </button>
    </li>
  );
}

export default SearchResultItem;
