import SearchResultsList from './SearchResultsList';

type Props = {
  isSelected: boolean;
  searchTermMatches: string[];
  searchTermPerfectMatches: string[];
};

function FilterSectionSearch({
  isSelected,
  searchTermMatches,
  searchTermPerfectMatches
}: Props) {
  return (
    <section id='results-container' className='p-4'>
      <h2
        className={`text-xl font-semibold ${
          isSelected
            ? `dark:text-dark-secondary-colour`
            : `dark:text-dark-primary-color`
        }`}
      >
        Results
      </h2>
      <SearchResultsList
        searchTermMatches={searchTermMatches}
        searchTermPerfectMatches={searchTermPerfectMatches}
      />
    </section>
  );
}

export default FilterSectionSearch;
