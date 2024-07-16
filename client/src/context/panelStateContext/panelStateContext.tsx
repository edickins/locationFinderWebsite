import {
  PropsWithChildren,
  useReducer,
  createContext,
  useMemo,
  useContext
} from 'react';
import filtersReducer from '../../reducer/filtersReducer/filtersReducer';
import { IPanelStateContext } from './types';

const PanelsContext = createContext<IPanelStateContext>({
  panelsState: {
    isPanelOpen: false,
    isFacilitiesSelected: false,
    isFavouritesSelected: false,
    isSearchSelected: false
  },
  dispatchFilters: () => {}
});

export default function PanelStateProvider({ children }: PropsWithChildren) {
  const [panelsState, dispatchPanelState] = useReducer(filtersReducer, {
    isPanelOpen: false,
    isFacilitiesSelected: false,
    isFavouritesSelected: false,
    isSearchSelected: false,
    isSearchActive: false
  });

  // create context initialValue
  const initialValue: IPanelStateContext = useMemo(
    () => ({
      panelsState,
      dispatchFilters: dispatchPanelState
    }),
    [panelsState]
  );

  return (
    <PanelsContext.Provider value={initialValue}>
      {children}
    </PanelsContext.Provider>
  );
}

// hooks
export const usePanelStateContext = () => {
  const context = useContext(PanelsContext);
  if (context === undefined) {
    throw new Error(
      'usePanelStateContext must be used within a PanelStateProvider'
    );
  }
  return context;
};
