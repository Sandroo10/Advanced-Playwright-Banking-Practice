import { expect } from "@playwright/test";
import { test } from "../../fixtures/auth.fixture";

test.describe("Dashboard | BANK-DASH", () => {
  test("BANK-DASH-01: displays account balances", async ({
    authenticatedPage,
  }) => {
    await expect(authenticatedPage.accountsSummary.welcomeBanner).toBeVisible();
    await expect(authenticatedPage.accountsSummary.checkingBalance).toBeVisible();
    await expect(authenticatedPage.accountsSummary.savingsBalance).toBeVisible();
  });

  test("BANK-DASH-02: displays recent transactions", async ({
    authenticatedPage,
  }) => {
    await expect(
      authenticatedPage.accountsSummary.recentTransactionsHeading,
    ).toBeVisible();
    await expect(authenticatedPage.accountsSummary.transactionsTable).toBeVisible();
    await expect(authenticatedPage.accountsSummary.transactionHeaders).toHaveText([
      "Date",
      "Description",
      "Category",
      "Amount",
    ]);
    await expect(authenticatedPage.accountsSummary.transactionRows).toHaveCount(3);
    await expect(authenticatedPage.accountsSummary.transactionCells(0)).toHaveText([
      "2026-06-04",
      "Grocery Store checkout",
      "Shopping",
      "-$120.50",
    ]);
    await expect(authenticatedPage.accountsSummary.transactionCells(1)).toHaveText([
      "2026-06-03",
      "Salary credit Apex Corp",
      "Income",
      "+$3500.00",
    ]);
    await expect(authenticatedPage.accountsSummary.transactionCells(2)).toHaveText([
      "2026-06-01",
      "Coffee shop subscription",
      "Dining",
      "-$15.75",
    ]);
  });

  test("BANK-DASH-03: displays total net worth", async ({
    authenticatedPage,
  }) => {
    await expect(authenticatedPage.accountsSummary.netWorthCard).toBeVisible();
    await expect(authenticatedPage.accountsSummary.netWorthCard).toContainText(
      "Total Net Worth",
    );
    await expect(authenticatedPage.accountsSummary.netWorthValue).toHaveText(
      "$22,650.00",
    );
    await expect(
      authenticatedPage.accountsSummary.netWorthDescription,
    ).toBeVisible();
  });
});
