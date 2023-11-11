import FilterButton from '../buttons/FilterButton';

interface Props {
  isSelected: boolean;
  onClick: () => void;
}

function FilterSectionFavourites({ isSelected, onClick }: Props) {
  return (
    <section id='favourites-container' className='p-4'>
      <FilterButton icon='fa-star' onClick={onClick} isSelected={isSelected}>
        <span className='text-xl'>Favourites</span>
      </FilterButton>
    </section>
  );
}

export default FilterSectionFavourites;
