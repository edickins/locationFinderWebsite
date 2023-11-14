import { useState } from 'react';
import { useLocationsContext } from '../../context/locationContext/locationsContext';

type Props = {
  addLocationToResults: (
    matches: RegExpMatchArray | null,
    locationID: string,
    term: string
  ) => void;
  clearAllSearches: () => void;
};
function SearchLocation({ addLocationToResults, clearAllSearches }: Props) {
  const [searchText, setSearchText] = useState('');
  const {
    state: { locations }
  } = useLocationsContext();

  const findTermInAddressFields = (term: string) => {
    // Escape special characters in the term
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regEx = new RegExp(escapedTerm, 'i');

    locations.forEach((location) => {
      location.address_components.forEach((addressComponent) => {
        if (!('political' in addressComponent.types)) {
          const longNameMatches = addressComponent.long_name.match(regEx);
          const shortNameMatches = addressComponent.short_name.match(regEx);
          addLocationToResults(
            longNameMatches,
            location.id,
            addressComponent.long_name
          );
          addLocationToResults(
            shortNameMatches,
            location.id,
            addressComponent.short_name
          );
        }
      });
    });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: term } = e.target;
    setSearchText(term);
    clearAllSearches();
    findTermInAddressFields(term);
  };

  return (
    <input
      type='text'
      name='search'
      id='search'
      placeholder='search location...'
      className='w-48 rounded-md px-2 dark:text-gray-900'
      onChange={onSearchChange}
    />
  );
}

export default SearchLocation;
