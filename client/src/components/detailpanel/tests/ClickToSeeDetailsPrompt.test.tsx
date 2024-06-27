import { render, screen } from '@testing-library/react';
import ClickToSeeDetailsPrompt from '../ClickToSeeDetailsPrompt';

describe('ClickToSeeDetailsPrompt', () => {
  test('Displays message when required', () => {
    render(<ClickToSeeDetailsPrompt showMessage />);

    const promptText = screen.getByText(
      'open this panel to see details for this location'
    );
    expect(promptText).toBeInTheDocument();
  });

  test('Does not display message when required', () => {
    render(<ClickToSeeDetailsPrompt showMessage={false} />);

    const promptText = screen.queryByText(
      'open this panel to see details for this location'
    );
    expect(promptText).not.toBeInTheDocument();
  });
});
