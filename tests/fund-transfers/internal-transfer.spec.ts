import { expect } from "@playwright/test";
import { test } from "../../fixtures/auth.fixture";
import { formatCurrency, parseCurrency } from "../../utils/currency";

test.describe("Fund Transfer | BANK-TRSF", () => {
  test("BANK-TRSF-05: transfers funds between checking and savings", async ({
    authenticatedPage,
  }) => {
    const transfer = authenticatedPage.fundsTransfer;
    const accounts = authenticatedPage.accountsSummary;
    const transferAmount = 1;

    await expect(accounts.checkingBalance).toBeVisible();
    await expect(accounts.savingsBalance).toBeVisible();

    const checkingBefore = parseCurrency(
      await accounts.checkingBalance.innerText(),
    );
    const savingsBefore = parseCurrency(
      await accounts.savingsBalance.innerText(),
    );

    await transfer.open();
    await transfer.executeInternalTransfer(
      "checking",
      "savings",
      transferAmount.toString(),
    );

    await expect(transfer.transferSuccessMessage).toBeVisible();
    await expect(transfer.transferSuccessMessage).toContainText(
      `Transfer of ${formatCurrency(transferAmount)} completed successfully.`,
    );

    await accounts.openDashboard();
    await expect(accounts.checkingBalance).toHaveText(
      formatCurrency(checkingBefore - transferAmount),
    );
    await expect(accounts.savingsBalance).toHaveText(
      formatCurrency(savingsBefore + transferAmount),
    );
  });
});
