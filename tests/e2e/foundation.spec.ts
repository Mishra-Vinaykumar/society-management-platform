import { expect, test } from "@playwright/test";

test("renders the web foundation and exposes API health", async ({ page, request }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "One reliable foundation for every society experience.",
    }),
  ).toBeVisible();
  await expect(page.getByText("Production data")).toBeVisible();
  await expect(page.getByText("Not connected")).toBeVisible();

  const healthResponse = await request.get("http://127.0.0.1:4000/api/v1/health");
  expect(healthResponse.ok()).toBe(true);
  await expect(healthResponse.json()).resolves.toMatchObject({
    service: "society-management-api",
    status: "ok",
  });
});
