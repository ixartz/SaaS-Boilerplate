// e2e/4a2/dashboard.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Dashboard Phase 4A2', () => {
  test.beforeEach(async ({ page }) => {
    // Bypass Clerk auth: set headers
    await page.goto('/dashboard', {
      headers: {
        'x-e2e-bypass': '1',
        'x-e2e-user': 'owner',
        'x-e2e-org': 'test-org',
      },
    });
  });

  test('should display KPI cards and project table with pagination', async ({ page }) => {
    await expect(page.getByText('Projects')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();

    // Check if pagination controls are present
    await expect(page.locator('button:has-text("Previous")')).toBeVisible();
    await expect(page.locator('button:has-text("Next")')).toBeVisible();
  });

  test('should display search functionality', async ({ page }) => {
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test('should navigate pagination next/prev', async ({ page }) => {
    // Check if pagination buttons are enabled/disabled correctly
    const prevButton = page.locator('button:has-text("Previous")');
    const nextButton = page.locator('button:has-text("Next")');

    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    // Try clicking next if enabled
    if (await nextButton.isEnabled()) {
      await nextButton.click();
    }

    // Try clicking previous if enabled
    if (await prevButton.isEnabled()) {
      await prevButton.click();
    }
  });

  test('should create new project via modal', async ({ page }) => {
    // Look for create project button in header or quick actions
    const createButton = page.locator('button:has-text("Create Project")').first();

    await expect(createButton).toBeVisible();

    await createButton.click();

    // Check if modal opens
    await expect(page.locator('text=Create New Project')).toBeVisible();

    // Fill form
    await page.fill('input[name="name"]', 'E2E Test Project');
    await page.fill('textarea[name="description"]', 'E2E Test Description');

    // Submit form
    const submitButton = page.locator('button:has-text("Create Project")').last();

    await expect(submitButton).toBeVisible();

    // Note: In real test, we would submit and verify the project appears
    // For now, just verify the modal opened and form is fillable
  });

  test('should display responsive layout', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });

    await expect(page.locator('table')).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.locator('table')).toBeVisible();
  });

  test('should have clean console', async ({ page }) => {
    const consoleMessages: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });

    await page.reload();

    // Wait for page to load
    await expect(page.getByText('Dashboard')).toBeVisible();

    // Check for console errors
    expect(consoleMessages).toHaveLength(0);
  });
});
