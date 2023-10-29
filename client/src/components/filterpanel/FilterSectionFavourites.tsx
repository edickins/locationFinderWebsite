import FilterButton from '../buttons/FilterButton';

interface Props {
  isFavouritesActive: boolean;
  onClick: () => void;
}

function FilterSectionFavourites({ isFavouritesActive, onClick }: Props) {
  return (
    <section id='favourites-container' className='p-4'>
      <FilterButton
        icon='fa-star'
        onClick={onClick}
        isActive={isFavouritesActive}
      >
        <span className='text-xl'>Favourites</span>
      </FilterButton>
    </section>
  );
}

export default FilterSectionFavourites;
