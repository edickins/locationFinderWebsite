import { render, screen } from '@testing-library/react';
import DetailPanelOpeningTimes from '../DetailPanelOpeningTimes';
import * as testLocation from './data/index.json';

describe('DetailPanelOpeningTimes', () => {
  const item = testLocation;
  test('It renders the correct number of opening times', () => {
    render(<DetailPanelOpeningTimes item={item} />);
    const openingListItems = screen.getAllByRole('listitem');
    expect(openingListItems).toHaveLength(8);
  });

  test('It doesnt render CLOSED message when the location is not closed', () => {
    render(<DetailPanelOpeningTimes item={item} />);
    const closedText = screen.queryByText(
      'This toilet is currently closed and not in service.'
    );
    expect(closedText).not.toBeInTheDocument();
  });

  test('It renders CLOSED message when the location is closed', () => {
    const closedItem = {
      ...item,
      open_status: 'closed'
    };

    render(<DetailPanelOpeningTimes item={closedItem} />);
    const closedText = screen.getByText(
      'This toilet is currently closed and not in service.'
    );
    expect(closedText).toBeInTheDocument();
  });
});
