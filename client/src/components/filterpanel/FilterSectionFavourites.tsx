interface Props {
  isFavouritesActive: boolean;
}

function FilterSectionFavourites({ isFavouritesActive }: Props) {
  return (
    <section id='favourites-container' className='p-4'>
      <h2
        className={`text-xl font-semibold ${
          isFavouritesActive
            ? `dark:text-dark-secondary-color`
            : `dark:text-dark-primary-color`
        }`}
      >
        <i className='fa-solid fa-star'></i>Favourites &gt;
      </h2>
    </section>
  );
}

export default FilterSectionFavourites;
