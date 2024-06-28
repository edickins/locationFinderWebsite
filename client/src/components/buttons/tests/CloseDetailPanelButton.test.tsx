import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import CloseDetailPanelButton from '../CloseDetailPanelButton';

const mockHidePanel = vi.fn();
const mockShowPanel = vi.fn();
const renderDetailPanelButton = (isOpen: boolean) => {
  render(
    <CloseDetailPanelButton
      hidePanel={mockHidePanel}
      showPanel={mockShowPanel}
      upIcon={faChevronUp}
      downIcon={faChevronDown}
      isPanelOpen={isOpen}
      title='Close Panel'
    />
  );
};

describe('CloseDetailPanelButton', () => {
  afterEach(() => {
    mockHidePanel.mockReset();
    mockShowPanel.mockReset();
  });

  test('Correct button text is displayed when panel is open', () => {
    renderDetailPanelButton(true);

    const openCloseButton = screen.getByRole('button', { name: /see less/ });
    expect(openCloseButton).toBeInTheDocument();
  });
  test('Correct button text is displayed when panel is closed', () => {
    renderDetailPanelButton(false);

    const openCloseButton = screen.getByRole('button', { name: /see more/ });
    expect(openCloseButton).toBeInTheDocument();
  });

  test('Correct button function is called when button is clicked and panel is open', async () => {
    renderDetailPanelButton(true);
    const user = userEvent.setup();

    const openCloseButton = screen.getByRole('button', { name: /see less/ });

    await user.click(openCloseButton);
    expect(mockHidePanel).toHaveBeenCalledTimes(1);
  });

  test('Correct button function is called when button is clicked and panel is closed', async () => {
    renderDetailPanelButton(false);
    const user = userEvent.setup();

    const openCloseButton = screen.getByRole('button', { name: /see more/ });

    await user.click(openCloseButton);
    expect(mockShowPanel).toHaveBeenCalledTimes(1);
  });
});
