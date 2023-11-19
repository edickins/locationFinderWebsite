import { useRef, useState } from 'react';
import { useLocationsContext } from '../../context/locationContext/locationsContext';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';
import { SearchActionEnum } from '../../reducer/searchReducer/types';

function SearchLocation() {
  // store regEx matches in useRef() state
  const matchesRef = useRef<Set<string>>(new Set());
  const perfectMatchesRef = useRef<Set<string>>(new Set());
  const { dispatchFilters, dispatchSearchResults } = useFiltersContext();

  const onSearchPanelChange = () => {
    dispatchFilters({ type: FiltersActionEnum.SEARCH_TERM_CHANGE });
  };

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

      const longNameMatches = location.long_name.match(regEx);
      addLocationToResults(longNameMatches, location.id, location.long_name);
      const formattedAddressMatches = location.formatted_address.match(regEx);
      addLocationToResults(
        formattedAddressMatches,
        location.id,
        location.formatted_address
      );
    });

    dispatchSearchResults({
      type: SearchActionEnum.ADD_SEARCH_MATCH_IDS,
      payload: Array.from(matchesRef.current)
    });

    dispatchSearchResults({
      type: SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS,
      payload: Array.from(perfectMatchesRef.current)
    });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // set the useRef values to empty strings
    clearAllSearches();
    setSearchText(value);
    if (value === '') {
      dispatchSearchResults({
        type: SearchActionEnum.ADD_SEARCH_MATCH_IDS,
        payload: []
      });

      dispatchSearchResults({
        type: SearchActionEnum.ADD_SEARCH_PERFECT_MATCH_IDS,
        payload: []
      });
      return;
    }
    // look for the entered text in the address_component fields
    findTermInAddressFields(value);
    onSearchPanelChange();
  };

  return (
    <input
      type='text'
      name='search'
      id='search'
      placeholder='search location...'
      className='mb-1 w-48 rounded-sm px-2  dark:text-gray-900'
      onChange={onSearchChange}
      onFocus={onSearchChange}
    />
  );
}

export default SearchLocation;
