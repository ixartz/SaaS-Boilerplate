import { expect } from '@playwright/test';

import { test } from './fixtures';

const bypassHeaders = {
  'x-e2e-bypass': 'true',
  'x-e2e-user': 'user_e2e_owner',
  'x-e2e-org': 'org_e2e_default',
};

const SIGN_IN_PATH = '/sign-in';

function expectNotRedirected(page, expectedPath: string) {
  return expect(page).toHaveURL(new RegExp(`${expectedPath}$`, 'i'));
}

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('should switch language from English to French using dropdown and verify text on the homepage', async ({ page }) => {
      await page.setExtraHTTPHeaders(bypassHeaders);

      await page.goto('/');

      await expect(page.getByText('The perfect SaaS template to build')).toBeVisible();

      await page.getByRole('button', { name: 'lang-switcher' }).click();
      await page.getByText('Français').click();

      await expect(page.getByText('Le parfait SaaS template pour construire')).toBeVisible();
    });

    test('should switch language from English to French using URL and verify text on the sign-in page', async ({ page }) => {
      await page.setExtraHTTPHeaders({
        ...bypassHeaders,
        'accept-language': 'en',
        'x-e2e-org': 'org_e2e_en',
      });

      await page.goto(SIGN_IN_PATH);

      await expectNotRedirected(page, SIGN_IN_PATH);

      await expect(page).toHaveURL(/sign-in$/);

      await page.setExtraHTTPHeaders({
        ...bypassHeaders,
        'accept-language': 'fr',
        'x-e2e-org': 'org_e2e_fr',
      });

      await page.goto('/fr/sign-in');

      await expectNotRedirected(page, '/fr/sign-in');

      await expect(page).toHaveURL(/fr\/sign-in$/);
    });
  });
});
