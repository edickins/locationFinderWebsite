import { screen, render } from '@testing-library/react';
import DetailPanelDateModified from '../DetailPanelDateModified';

describe('DetailPanelDateModified', () => {
  const formattedDate = `23rd July, 2024`;
  test('It renders the date', () => {
    render(<DetailPanelDateModified formatedModifiedDate={formattedDate} />);

    screen.logTestingPlaygroundURL();

    const dateText = screen.getByText('This information was last modified on', {
      exact: false
    });
    expect(dateText).toBeInTheDocument();
  });
});
