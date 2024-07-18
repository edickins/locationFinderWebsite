import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as testLocation from './data/index.json';
import { ILocation } from '../../../context/locationContext/types';
import DetailPanelShowLocationButton from '../DetailPanelShowLocationButton';

const mockLocation: ILocation = testLocation as ILocation;
const mockSetSearchParams = vi.fn();

describe('DetailPanelShowLocationButton', () => {
  test('Displays child props and initial state', () => {
    render(
      <DetailPanelShowLocationButton
        item={mockLocation}
        setSearchParams={mockSetSearchParams}
        searchParams={new URLSearchParams('locationID=location001')}
      >
        <p>child text</p>
      </DetailPanelShowLocationButton>
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
      <DetailPanelShowLocationButton
        item={mockLocation}
        setSearchParams={mockSetSearchParams}
        searchParams={new URLSearchParams('locationID=location001')}
      >
        <p>child text</p>
      </DetailPanelShowLocationButton>
    );

    const showLocationButton = screen.getByRole('button', {
      name: /click to see on map/i
    });

    // click
    await user.click(showLocationButton);
    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    expect(mockSetSearchParams.mock.calls[0][0].toString()).toEqual(
      'locationID=location001'
    );
  });
});
