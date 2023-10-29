function FavouritesButton({
  onClick,
  isFavouritesActive,
  largeText
}: {
  onClick: () => void;
  isFavouritesActive: boolean;
  largeText?: boolean;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={` ${
        isFavouritesActive
          ? `dark:text-dark-secondary-color`
          : `dark:text-dark-primary-color`
      }`}
    >
      <i className='fa-solid fa-star'></i>
      <span className={`ml-1 ${largeText ? 'text-xl' : 'text-xs'}`}>
        Favourites
      </span>
    </button>
  );
}

export default FavouritesButton;
