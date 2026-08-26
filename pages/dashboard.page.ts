import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class DashboardPage extends BasePage {
  readonly welcomeBanner: Locator;
  readonly checkingBalance: Locator;
  readonly savingsBalance: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeBanner = page.getByText(/Welcome back,? Apex User/i);
    this.checkingBalance = page.getByText("$4,250.00", { exact: true });
    this.savingsBalance = page.getByText("$18,400.00", { exact: true });
  }
}
