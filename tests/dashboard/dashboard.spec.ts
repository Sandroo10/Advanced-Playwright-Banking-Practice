import { expect } from "@playwright/test";
import { test } from "../../fixtures/auth.fixture";

test.describe("Dashboard | BANK-DASH", () => {
  test("BANK-DASH-01: displays account balances", async ({
    authenticatedPage,
  }) => {
    await expect(authenticatedPage.welcomeBanner).toBeVisible();
    await expect(authenticatedPage.checkingBalance).toBeVisible();
    await expect(authenticatedPage.savingsBalance).toBeVisible();
  });
});
