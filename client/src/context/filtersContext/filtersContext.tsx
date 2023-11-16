import {
  PropsWithChildren,
  useReducer,
  createContext,
  useMemo,
  useContext
} from 'react';
import filtersReducer from '../../reducer/filtersReducer/filtersReducer';
import { IFiltersContext } from './types';
import { FiltersActionType } from '../../reducer/filtersReducer/types';

const FiltersContext = createContext<IFiltersContext>({
  state: {
    isPanelOpen: false,
    isFacilitiesSelected: false,
    isFavouritesSelected: false,
    isSearchActive: false
  },
  dispatchFilters: () => {}
});

export default function FiltersProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(filtersReducer, {
    isPanelOpen: false,
    isFacilitiesSelected: false,
    isFavouritesSelected: false,
    isSearchActive: false
  });

  // rename 'action' to make it clear which Reducer it is from
  const dispatchFilters = (action: FiltersActionType) => {
    dispatch(action);
  };

  // create context initialValue
  const initialValue: IFiltersContext = useMemo(
    () => ({
      state,
      dispatchFilters
    }),
    [state]
  );

  return (
    <FiltersContext.Provider value={initialValue}>
      {children}
    </FiltersContext.Provider>
  );
}

// hook
export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  return context;
};
