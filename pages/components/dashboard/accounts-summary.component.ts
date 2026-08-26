import type { Locator, Page } from "@playwright/test";

export class AccountsSummaryComponent {
  readonly welcomeBanner: Locator;
  readonly checkingBalance: Locator;
  readonly savingsBalance: Locator;
  readonly recentTransactionsHeading: Locator;
  readonly transactionsTable: Locator;
  readonly transactionHeaders: Locator;
  readonly transactionRows: Locator;
  readonly netWorthCard: Locator;
  readonly netWorthValue: Locator;
  readonly netWorthDescription: Locator;

  constructor(page: Page) {
    this.welcomeBanner = page.getByText(/Welcome back,? Apex User/i);
    this.checkingBalance = page.getByText("$4,250.00", { exact: true });
    this.savingsBalance = page.getByText("$18,400.00", { exact: true });
    this.recentTransactionsHeading = page.getByRole("heading", {
      name: "Recent Transactions",
    });
    this.transactionsTable = page.locator("#transactions-table");
    this.transactionHeaders = this.transactionsTable.locator("thead th");
    this.transactionRows = this.transactionsTable.locator("tbody tr");
    this.netWorthCard = page
      .locator(".card-complex")
      .filter({ hasText: "Total Net Worth" });
    this.netWorthValue = this.netWorthCard.locator(".net-worth-val");
    this.netWorthDescription = this.netWorthCard.getByText(
      "Liquid Assets Combined",
      { exact: true },
    );
  }

  transactionCells(rowIndex: number): Locator {
    return this.transactionRows.nth(rowIndex).locator("td");
  }
}
