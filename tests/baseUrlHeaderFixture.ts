import { test as baseTest, expect } from "@playwright/test";

export const test = baseTest.extend<{
  baseUrlHeading: () => Promise<void>;
}>({
  baseUrlHeading: async ({ page }, use) => {
    await page.goto("/todomvc");
    await expect(page.getByRole("heading", { name: "todos" })).toBeVisible();
    await use(async () => {});
  },
});
export { expect };
