import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import * as testLocation from './data/index.json';
import DetailPanelAddress from '../DetailPanelAddress';
import { ILocation } from '../../../context/locationContext/types';

const mockHidePanel = vi.fn();
const mockShowPanel = vi.fn();

let mockSearchParam =
  'userLocation=%7B"lat"%3A50.83182%2C"lng"%3A-0.12044000000000002%7D';

// Replace the original hook with the mock
vi.mock('react-router-dom', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = (await vi.importActual('react-router-dom')) as any;
  return {
    ...actual,
    useSearchParams: () => {
      const [params, setParams] = useState(
        new URLSearchParams(mockSearchParam)
      );
      return [
        params,
        (newParams: string) => {
          mockSearchParam = newParams;
          setParams(new URLSearchParams(newParams));
        }
      ];
    }
  };
});

const mockLocation: ILocation = testLocation as ILocation;

type Props = {
  item: ILocation | undefined;
  isPanelOpen: boolean;
  hidePanel: () => void;
  showPanel: () => void;
};

const renderDetailPanelAddress = ({
  item,
  isPanelOpen,
  hidePanel,
  showPanel
}: Props) => {
  render(
    <MemoryRouter>
      <DetailPanelAddress
        hidePanel={hidePanel}
        showPanel={showPanel}
        item={item}
        isPanelOpen={isPanelOpen}
        key={null}
        type={undefined}
        props={undefined}
      />
    </MemoryRouter>
  );
};

describe('DetailPanelAddress', () => {
  test('Initial display state is correct', () => {
    const initObj: Props = {
      item: mockLocation,
      isPanelOpen: false,
      hidePanel: mockHidePanel,
      showPanel: mockShowPanel
    };
    renderDetailPanelAddress(initObj);
    // confirm default initial text is displayed
    const openCloseButton = screen.getByText(mockLocation.long_name, {
      exact: true
    });
    const directionsButton = screen.getByRole('button', {
      name: /get directions/i
    });
    const favouriteButton = screen.getByRole('button', {
      name: /toggle favourite/i
    });
    const formattedAddress = screen.getByText(mockLocation.formatted_address);
    expect(openCloseButton).toBeInTheDocument();
    expect(directionsButton).toBeInTheDocument();
    expect(favouriteButton).toBeInTheDocument();
    expect(formattedAddress).toBeInTheDocument();
  });

  test('Clicking the location title opens the panel if it was closed', async () => {
    const user = userEvent.setup();
    const initObj: Props = {
      item: mockLocation,
      isPanelOpen: false,
      hidePanel: mockHidePanel,
      showPanel: mockShowPanel
    };
    renderDetailPanelAddress(initObj);
    // click the button to open the panel
    const openCloseButton = screen.getByText(mockLocation.long_name, {
      exact: true
    });
    await user.click(openCloseButton);
    expect(mockShowPanel).toHaveBeenCalledTimes(1);

    mockHidePanel.mockReset();
    mockShowPanel.mockReset();
  });

  test('Clicking the location title closes the panel if it was open', async () => {
    const user = userEvent.setup();
    const initObj: Props = {
      item: mockLocation,
      isPanelOpen: true,
      hidePanel: mockHidePanel,
      showPanel: mockShowPanel
    };
    renderDetailPanelAddress(initObj);
    // click the button to open the panel
    const openCloseButton = screen.getByText(mockLocation.long_name, {
      exact: true
    });
    await user.click(openCloseButton);
    expect(mockHidePanel).toHaveBeenCalledTimes(1);

    mockHidePanel.mockReset();
    mockShowPanel.mockReset();
  });

  test('Displays CLOSED message if a toilet is currently closed', async () => {
    // change values of the location object
    const newLocation: ILocation = {
      ...mockLocation,
      open_status: 'closed'
    };
    const initObj: Props = {
      item: newLocation,
      isPanelOpen: true,
      hidePanel: mockHidePanel,
      showPanel: mockShowPanel
    };
    renderDetailPanelAddress(initObj);

    // look for the CLOSED message
    const closedText = screen.getByText(
      'This toilet is currently closed and not in service.'
    );
    expect(closedText).toBeInTheDocument();
  });
});
