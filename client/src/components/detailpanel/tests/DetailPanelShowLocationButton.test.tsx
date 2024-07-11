import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as testLocation from './data/index.json';
import { ILocation } from '../../../context/locationContext/types';
import DetailPanelShowLocationButton from '../DetailPanelShowLocationButton';

const mockLocation: ILocation = testLocation as ILocation;
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
      const [params] = useState(new URLSearchParams());
      return [params, mockSetSearchParams];
    }
  };
});

describe('DetailPanelShowLocationButton', () => {
  test('Displays child props and initial state', () => {
    render(
      <MemoryRouter>
        <DetailPanelShowLocationButton item={mockLocation}>
          <p>child text</p>
        </DetailPanelShowLocationButton>
      </MemoryRouter>
    );

    const childText = screen.getByText('child text');
    expect(childText).toBeInTheDocument();

    const showLocationButton = screen.getByRole('button', {
      name: /click to see on map/i
    });

    expect(showLocationButton).toBeInTheDocument();
  });

  test('Clicking the button calls setSearchParams with correct argument', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DetailPanelShowLocationButton item={mockLocation}>
          <p>child text</p>
        </DetailPanelShowLocationButton>
      </MemoryRouter>
    );
    const showLocationButton = screen.getByRole('button', {
      name: /click to see on map/i
    });

    await user.click(showLocationButton);
    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    expect(mockSetSearchParams.mock.calls[0][0].toString()).toEqual(
      'locationID=location001'
    );
  });
});
