import { useState } from 'react';
import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import FilterPanel from '../FilterPanel';

const mockHandleFindNearestLocationClick = vi.fn();

const mockSearchParams = new URLSearchParams();
const mockSetSearchParams = vi.fn();
const mockUseSearchParams = vi.fn().mockImplementation(() => {
  return [mockSearchParams, mockSetSearchParams];
});

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as any;
  return {
    ...actual,
    useSearchParams: () => {
      const [params] = useState(new URLSearchParams());
      return [params, mockSetSearchParams];
    }
  };
});

describe('FilterPanel', () => {
  test('Initial render is correct', () => {
    render(
      <FilterPanel
        handleFindLocationButtonClick={mockHandleFindNearestLocationClick}
      />
    );
  });
});
