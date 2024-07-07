import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import { vi } from 'vitest';

const mockSetSearchParams = vi
  .fn()
  .mockImplementation((newParams: URLSearchParams) => {
    return new URLSearchParams(newParams);
  });

// Replace the original hook with the mock
vi.mock('react-router-dom', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = (await vi.importActual('react-router-dom')) as any;
  return {
    ...actual,
    useSearchParams: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [params, setParams] = useState(new URLSearchParams());
      return [params, mockSetSearchParams];
    }
  };
});

describe('FilterPanel', () => {});
