// tests/e2e/4a2/dashboard-simple.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Dashboard Simple Test', () => {
  test('should load dashboard page', async ({ page }) => {
    // Navigate to dashboard with E2E bypass
    await page.goto('/dashboard', {
      headers: {
        'x-e2e-bypass': '1',
        'x-e2e-user': 'owner',
        'x-e2e-org': 'test-org',
      },
    });

    // Take screenshot for debugging
    await page.screenshot({ path: 'dashboard-debug.png' });

    // Check if page loads
    await expect(page.getByText('Dashboard')).toBeVisible();

    // Check if we can see any content
    // Page content logged for debugging
  });

  test('should display basic elements', async ({ page }) => {
    await page.goto('/dashboard', {
      headers: {
        'x-e2e-bypass': '1',
        'x-e2e-user': 'owner',
        'x-e2e-org': 'test-org',
      },
    });

    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');

    // Check for basic dashboard elements
    await expect(page.getByText('Dashboard')).toBeVisible();

    // Check if there's any table or content area
    const hasTable = await page.locator('table').count() > 0;
    const hasCards = await page.locator('[class*="card"]').count() > 0;

    // Has table and cards logged for debugging

    // At least one should be present
    expect(hasTable || hasCards).toBeTruthy();
  });
});
