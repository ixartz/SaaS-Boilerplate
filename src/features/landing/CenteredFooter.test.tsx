import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import messages from '@/locales/en.json';

import { CenteredFooter } from './CenteredFooter';

describe('CenteredFooter', () => {
  describe('Render method', () => {
    it('should have copyright information', () => {
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <CenteredFooter logo={null} name="" iconList={null} legalLinks={null}>
            Random children
          </CenteredFooter>
        </NextIntlClientProvider>,
      );

      const copyright = screen.getByText(/© /);

      expect(copyright).toBeInTheDocument();
    });
  });
});
