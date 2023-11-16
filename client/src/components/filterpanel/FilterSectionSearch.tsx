import SearchResultsList from './SearchResultsList';

type Props = {
  searchTermMatches: string[];
  searchTermPerfectMatches: string[];
};

function FilterSectionSearch({
  searchTermMatches,
  searchTermPerfectMatches
}: Props) {
  return (
    <section id='results-container' className='p-4'>
      <h2 className='text-xl font-semibold'>Results</h2>
      <SearchResultsList
        searchTermMatches={searchTermMatches}
        searchTermPerfectMatches={searchTermPerfectMatches}
      />
    </section>
  );
}

export default FilterSectionSearch;
