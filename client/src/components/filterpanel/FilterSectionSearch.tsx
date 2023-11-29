import SearchResultsList from './SearchResultsList';

function FilterSectionSearch() {
  return (
    <section id='results-container' className='px-4 py-2'>
      <h2 className='text-xl font-semibold'>Results</h2>
      <SearchResultsList />
    </section>
  );
}

export default FilterSectionSearch;
