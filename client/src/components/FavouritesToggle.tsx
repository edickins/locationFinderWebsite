import { useState } from 'react';
import { LocationActionEnum } from '../reducer/locationReducer/types';
import { useLocationsContext } from '../context/locationContext/locationsContext';

type Props = {
  isFavourite: boolean | undefined;
  id: string | undefined;
};

function FavouritesToggle({ isFavourite = false, id }: Props) {
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
  const notFavouriteHoverClass = isFavourite && hover ? 'fas' : 'far';

  const element = (
    <button
      type='button'
      aria-label='toggle favourite'
      onClick={toggleState}
      title='Add/remove this toilet to your list of favourites.'
      className='mb-6 text-xl  text-light-secondary-color hover:text-light-secondary-color dark:text-dark-secondary-color hover:dark:text-dark-primary-color'
    >
      <i
        className={`fa-star ${
          isFavourite ? isFavouriteHoverClass : notFavouriteHoverClass
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />{' '}
      <span className='text-lg'>
        {isFavourite ? `remove favourite` : `add as favourite`}
      </span>
    </button>
  );

  return element;
}

export default FavouritesToggle;
