import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import DoneButton from '../DoneButton';

describe('DoneButton', () => {
  const mockHidePanel = vi.fn();

  afterEach(() => {
    mockHidePanel.mockReset();
  });

  test('Does not render if the panel is not open', () => {
    render(<DoneButton hideFilterPanel={mockHidePanel} isPanelOpen={false} />);

    const doneButton = screen.queryByRole('button', { name: /done/i });
    expect(doneButton).not.toBeInTheDocument();
  });

  test('Calls close function on button click', async () => {
    render(<DoneButton hideFilterPanel={mockHidePanel} isPanelOpen />);
    const user = userEvent.setup();

    const doneButton = screen.getByRole('button', { name: /done/i });
    expect(doneButton).toBeInTheDocument();

    await user.click(doneButton);
    expect(mockHidePanel).toHaveBeenCalledTimes(1);
  });
});
