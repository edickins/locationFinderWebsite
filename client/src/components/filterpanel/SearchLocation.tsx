import { useRef, useState } from 'react';
import { useLocationsContext } from '../../context/locationContext/locationsContext';

type Props = {
  setSearchTermMatches: (matches: string[]) => void;
  setSearchTermPerfectMatches: (matches: string[]) => void;
  handleSearchPanelOnChange: () => void;
};
function SearchLocation({
  setSearchTermMatches,
  setSearchTermPerfectMatches,
  handleSearchPanelOnChange
}: Props) {
  // store regEx matches in useRef() state
  const matchesRef = useRef<Set<string>>(new Set());
  const perfectMatchesRef = useRef<Set<string>>(new Set());

  const addLocationToResults = (
    regExMatches: RegExpMatchArray | null,
    locationID: string,
    term: string
  ): void => {
    if (regExMatches !== null) {
      matchesRef.current?.add(locationID);
    }

    regExMatches?.forEach((match) => {
      if (match === term) {
        perfectMatchesRef.current?.add(locationID);
      }
    });

    setSearchTermMatches(Array.from(matchesRef.current));
    setSearchTermPerfectMatches(Array.from(perfectMatchesRef.current));
  };

  const clearAllSearches = () => {
    matchesRef.current.clear();
    perfectMatchesRef.current.clear();
  };

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
    const { value } = e.target;
    clearAllSearches();
    setSearchText(value);
    findTermInAddressFields(value);
    handleSearchPanelOnChange();
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
