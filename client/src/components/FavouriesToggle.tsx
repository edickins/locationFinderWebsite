import { useState } from 'react';
import { LocationActionEnum } from '../reducer/locationReducer/types';
import { useLocationsContext } from '../context/locationContext/locationsContext';

type Props = {
  isFavourite: boolean | undefined;
  id: string | undefined;
};

function FavouriesToggle({ isFavourite = false, id }: Props) {
  const { dispatchLocations } = useLocationsContext();
  const [hover, setHover] = useState(false);

  const toggleState = () => {
    if (id) {
      dispatchLocations({
        type: LocationActionEnum.SET_AS_FAVOURITE,
        payload: { id, isFavourite: !isFavourite }
      });
    }
  };

  const isFavouriteHoverClass = !isFavourite && hover ? 'far' : 'fas';
  const notFavoruiteHoverClass = isFavourite && hover ? 'fas' : 'far';

  const element = (
    <button type='button' aria-label='toggle favourite' onClick={toggleState}>
      <i
        className={`fa-star ${
          isFavourite ? isFavouriteHoverClass : notFavoruiteHoverClass
        } dark:text-dark-secondary-color hover:dark:text-dark-primary-color`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    </button>
  );

  return element;
}

export default FavouriesToggle;
