import IconButton from '../buttons/IconButton';
import SearchLocation from './SearchLocation';
import { usePanelStateContext } from '../../context/panelStateContext/panelStateContext';
import { PanelsActionEnum } from '../../reducer/filtersReducer/types';

type Props = {
  handleFindLocationButtonClick: () => void;
  filtersParam: string | null;
};

function FilterPanelNav({
  handleFindLocationButtonClick,
  filtersParam
}: Props) {
  const { panelsState, dispatchFilters } = usePanelStateContext();
  const { isFavouritesSelected, isFacilitiesSelected } = panelsState;

  const onFilterButtonClick = () => {
    dispatchFilters({ type: PanelsActionEnum.FILTER_BUTTON_CLICK });
  };

  const onFavouriteButtonClick = () => {
    dispatchFilters({ type: PanelsActionEnum.FAVOURITES_BUTTON_CLICK });
  };

  const onFindNearestToiletButtonClick = () => {
    dispatchFilters({ type: PanelsActionEnum.HIDE_FILTER_PANEL });
    handleFindLocationButtonClick();
  };

  return (
    <nav
      id='filter-nav'
      aria-label='filter control panel'
      className='pointer-events-auto  flex flex-col gap-1 bg-light-panel  pb-2 pt-2 dark:bg-dark-panel md:relative md:flex-shrink  md:gap-2 md:border-l-2 md:border-r-2 md:border-t-2 md:border-light-secondary-color md:bg-light-panel-secondary md:bg-opacity-95 md:px-4 md:pb-0 md:pt-4  md:dark:bg-dark-panel'
    >
      <div className='flex justify-around md:hidden'>
        <IconButton
          icon='fa-filter'
          onClick={onFilterButtonClick}
          isSelected={isFacilitiesSelected}
          isActive={!!filtersParam}
        >
          <span className='text-xs'>Filter</span>
        </IconButton>

        <IconButton
          icon='fa-star'
          onClick={onFavouriteButtonClick}
          isSelected={isFavouritesSelected}
        >
          <span className='text-xs' data-testid='nav-favourites-button'>
            Favourites
          </span>
        </IconButton>

        <IconButton
          icon='fa-magnifying-glass'
          reverseColours
          onClick={onFindNearestToiletButtonClick}
        >
          <span className='text-xs'>Find nearest toilet</span>
        </IconButton>
      </div>

      <SearchLocation />
    </nav>
  );
}

export default FilterPanelNav;
