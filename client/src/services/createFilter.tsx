type FilterFunction<T> = (item: T) => boolean;

function createFilter<T>(filterFunction: FilterFunction<T>) {
  return function filterToilets(toilets: T[]) {
    return toilets.filter(filterFunction);
  };
}

export default createFilter;
