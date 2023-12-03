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
    <li className='align-left bg-white px-2 py-2 hover:bg-gray-100 md:mb-1 md:py-1'>
      <button type='button' onClick={() => onClick()} className='text-left'>
        {location && location.long_name}
      </button>
    </li>
  );
}

export default SearchResultItem;
