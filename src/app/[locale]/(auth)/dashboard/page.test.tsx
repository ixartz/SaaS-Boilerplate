/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import messages from '@/locales/en.json';

import DashboardIndexPage from './page';

describe('DashboardIndexPage', () => {
  describe('Render method', () => {
    it('should have a welcome message in the title bar', () => {
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DashboardIndexPage />
        </NextIntlClientProvider>,
      );

      const welcome = screen.getByText('Welcome to your dashboard');

      expect(welcome).toBeInTheDocument();
    });
  });
});
