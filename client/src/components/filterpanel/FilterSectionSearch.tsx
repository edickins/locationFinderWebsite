import SearchResultsList from './SearchResultsList';

type Props = {
  isSelected: boolean;
};

function FilterSectionSearch({ isSelected }: Props) {
  return (
    <section id='results-container' className='p-4'>
      <h2 className='text-xl font-semibold dark:text-dark-primary-color'>
        Results
      </h2>
      <SearchResultsList />
    </section>
  );
}

export default FilterSectionSearch;
