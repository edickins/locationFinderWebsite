import { render, screen } from '@testing-library/react';
import { IFacility } from '../../../context/facilitiesContext/types';
import DetailPanelFacilities from '../DetailPanelFacilities';

describe('DetailPanelFacilities', () => {
  const facilities: IFacility[] = [
    { full_name: 'facility001', short_name: 'facility001', id: 'facility001' },
    {
      full_name: 'facility002',
      short_name: 'facility002',
      id: 'facility002'
    },
    {
      full_name: 'facility003',
      short_name: 'facility003',
      id: 'facility003'
    }
  ];

  test('It renders the full list of facilities', () => {
    render(<DetailPanelFacilities facilities={facilities} />);

    const facilitiesItems = screen.getAllByRole('listitem');

    expect(facilitiesItems).toHaveLength(3);
  });
});
