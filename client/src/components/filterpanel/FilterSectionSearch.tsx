import SearchResultsList from './SearchResultsList';

function FilterSectionSearch() {
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
