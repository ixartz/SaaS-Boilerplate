import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import messages from '@/locales/en.json';
import { CenteredFooter } from './CenteredFooter';

describe('CenteredFooter', () => {
  describe('Render method', () => {
    it('should have copyright information', async () => {
      await render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <CenteredFooter logo={null} name="" iconList={null} legalLinks={null}>
            Random children
          </CenteredFooter>
        </NextIntlClientProvider>,
      );

      const copyright = page.getByText(/© /);

      expect(copyright).toBeInTheDocument();
    });
  });
});
