import FavouritesButton from '../buttons/FavouritesButton';

interface Props {
  isFavouritesActive: boolean;
  onClick: () => void;
}

function FilterSectionFavourites({ isFavouritesActive, onClick }: Props) {
  return (
    <section id='favourites-container' className='p-4'>
      <FavouritesButton
        onClick={onClick}
        isFavouritesActive={isFavouritesActive}
        largeText={true}
      />
    </section>
  );
}

export default FilterSectionFavourites;
