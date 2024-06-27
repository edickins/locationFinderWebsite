import { useRef } from 'react';
import { useLocationsContext } from '../../context/locationContext/locationsContext';
import { useFiltersContext } from '../../context/filtersContext/filtersContext';
import { FiltersActionEnum } from '../../reducer/filtersReducer/types';
import { SearchActionEnum } from '../../reducer/searchReducer/types';

function SearchLocation() {
  // store regEx matches in useRef() state
  const matchesRef = useRef<Set<string>>(new Set());
  const perfectMatchesRef = useRef<Set<string>>(new Set());
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const { dispatchFilters, dispatchSearchResults } = useFiltersContext();

  const dispatchOnSearchPanelChange = () => {
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

  const findTermInFacilitiesList = (term: string) => {
    // Escape special characters in the term
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regEx = new RegExp(escapedTerm, 'i');

    locations.forEach((location) => {
      location.facilities.forEach((facility) => {
        const longNameMatches = facility.full_name.match(regEx);
        const shortNameMatches = facility.short_name.match(regEx);

        addLocationToResults(longNameMatches, location.id, facility.full_name);
        addLocationToResults(
          shortNameMatches,
          location.id,
          facility.short_name
        );
      });
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

    dispatchSearchResults({
      type: SearchActionEnum.SET_SEARCH_TERM,
      payload: value
    });

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
    findTermInFacilitiesList(value);

    dispatchOnSearchPanelChange();
  };

  return (
    <div
      id='search-input'
      className='my-1 flex flex-row items-center justify-center '
    >
      <label htmlFor='search' className='mx-2 text-sm md:shrink-0 md:text-base'>
        Search{' '}
        <span className='hidden md:inline-block'>locations or facilities</span>
      </label>
      <input
        type='text'
        name='search'
        id='search'
        placeholder='type your search here...'
        className='mb-1 w-48 rounded-sm px-2 dark:text-gray-900 md:mb-0'
        onChange={onSearchChange}
        onFocus={() => dispatchOnSearchPanelChange()}
        ref={textInputRef}
      />
    </div>
  );
}

export default SearchLocation;
