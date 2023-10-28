function FavouritesButton({
  handleFavouritesClick,
  isFavouritesActive
}: {
  handleFavouritesClick: () => void;
  isFavouritesActive: boolean;
}) {
  return (
    <button
      type='button'
      onClick={handleFavouritesClick}
      className={` ${
        isFavouritesActive
          ? `dark:text-dark-secondary-color`
          : `dark:text-dark-primary-color`
      }`}
    >
      <i className='fa-solid fa-star'></i>
      <span className='ml-1 text-xs'>Favourites</span>
    </button>
  );
}

export default FavouritesButton;
