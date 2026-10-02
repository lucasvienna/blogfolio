import { test, expect } from "@playwright/test";

test("renders without crashing", async ({ page }) => {
	await page.goto("/");
	const heading = page.getByRole("heading", { name: "Lucas Vienna" });
	await expect(heading).toBeVisible();
});

test("has title", async ({ page }) => {
	await page.goto("/");
	await expect(page.title()).resolves.toMatch("LV | Home");
});
