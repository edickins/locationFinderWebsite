import { useState } from 'react';
import { screen, render } from '@testing-library/react';

import { vi } from 'vitest';
import FilterPanel from '../FilterPanel';

const mockHandleFindNearestLocationClick = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as any;
  return {
    ...actual,
    useSearchParams: () => {
      const [params, setParams] = useState(
        new URLSearchParams(mockSearchParams)
      );
      return [
        params,
        (newParams: string) => {
          setParams(new URLSearchParams(newParams));
        }
      ];
    }
  };
});

describe('FilterPanel - a test suite with params stored in state to test multiple clicks', () => {
  test('Initial render is correct', () => {
    render(
      <FilterPanel
        handleFindLocationButtonClick={mockHandleFindNearestLocationClick}
      />
    );
  });
});
