import { describe, expect, it } from 'vitest';
import createFilter from './createFilter';

type Item = {
  id: number;
  color: string;
  size: string;
};

const items: Item[] = [
  {
    id: 1,
    color: 'blue',
    size: 'large'
  },
  {
    id: 2,
    color: 'red',
    size: 'large'
  },
  {
    id: 3,
    color: 'red',
    size: 'small'
  }
];

describe('createFilter function', () => {
  it('filters an Array of items down to match the filter function.', () => {
    // arrange
    const filterFn = (item: Item) => item.color === 'blue';
    const filterForBlue = createFilter(filterFn);
    const results = filterForBlue(items);

    // assert
    expect(items).toHaveLength(3);
    expect(results).toHaveLength(1);
  });

  it('filters out all items when there is no match', () => {
    // arrange
    const filterFn = (item: Item) => item.color === 'beige';
    const filterForBeige = createFilter(filterFn);
    const results = filterForBeige(items);

    // assert
    expect(items).toHaveLength(3);
    expect(results).toHaveLength(0);
  });

  it('matches all items in the Array', () => {
    // arrange
    const filterFn = (item: Item) =>
      item.color === 'red' || item.color === 'blue';
    const filterForBlueAndRed = createFilter(filterFn);
    const results = filterForBlueAndRed(items);

    // assert
    expect(items).toHaveLength(3);
    expect(results).toHaveLength(3);
  });

  it('returns an empty Array if one is passed as an arg', () => {
    // arrange
    const filterFn = (item: Item) => item.size === 'large';
    const filterForLargeSize = createFilter(filterFn);

    const emptyItems: Item[] = [];
    const results = filterForLargeSize(emptyItems);

    expect(emptyItems).toHaveLength(0);
    expect(results).toHaveLength(0);
  });
});
