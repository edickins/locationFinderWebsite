import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ButtonActiveIcon from '../ButtonActiveIcon';
import { activeFilterSVG } from '../../googlemaps/components/markerSVGs';

describe('Render icon which accepts boolean isActive prop', () => {
  it('Should render an image when the isActive props is true', () => {
    const isActive = true;
    render(<ButtonActiveIcon isActive={isActive} icon={activeFilterSVG} />);

    const renderedIcon = screen.getByRole('img', { name: 'active icon' });
    expect(renderedIcon).toBeInTheDocument();
  });

  it('Should not render an image when the isActive props is false', async () => {
    const isActive = false;
    render(<ButtonActiveIcon isActive={isActive} icon={activeFilterSVG} />);

    const renderedIcon = await screen.queryByRole('img', {
      name: 'active icon'
    });
    expect(renderedIcon).not.toBeInTheDocument();
  });
});
