import { test, expect } from '@playwright/test';

test('nvaigates to about page and back', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('heading', { name: 'Lucas Vienna' })).toBeVisible();

	await page.getByRole('link', { name: 'About' }).click();
	await page.waitForURL('/about');

	await expect(page.getByText('A few words about me')).toBeVisible();

	await page.getByRole('link', { name: 'Lucas Vienna' }).click();
	await page.waitForURL('/');

	await expect(page.getByRole('heading', { name: 'Lucas Vienna' })).toBeVisible();
});
