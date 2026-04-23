import { render, screen } from '@testing-library/react';

import { CenteredFooter } from './CenteredFooter';

describe('CenteredFooter', () => {
  describe('Render method', () => {
    it('should have copyright information', () => {
      render(
        <CenteredFooter
          logo={null}
          name="Strix"
          iconList={null}
          legalLinks={null}
        >
          Random children
        </CenteredFooter>,
      );

      const copyright = screen.getByText(/©/);

      expect(copyright).toBeInTheDocument();
    });
  });
});
