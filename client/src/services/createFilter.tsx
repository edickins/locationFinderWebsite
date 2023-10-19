type FilterFunction<T> = (item: T) => boolean;

function createFilter<T>(filterFunction: FilterFunction<T>) {
  return function filterItems(items: T[]) {
    return items.filter(filterFunction);
  };
}

export default createFilter;
