import SearchResultsList from './SearchResultsList';

function FilterSectionSearch() {
  return (
    <section id='results-container' className='p-4'>
      <h2 className='dark:text-dark-secondary-color text-xl font-semibold'>
        Results
      </h2>
      <SearchResultsList />
    </section>
  );
}

export default FilterSectionSearch;
