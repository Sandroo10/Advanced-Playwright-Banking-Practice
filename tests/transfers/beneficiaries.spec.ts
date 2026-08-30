import { expect } from "@playwright/test";
import { test } from "../../fixtures/auth.fixture";
import { createBeneficiaryData } from "../../data/builders/beneficiary.builder";

test.describe("Fund Transfer | BANK-TRSF", () => {
  test("BANK-TRSF-01: adds a new beneficiary", async ({
    authenticatedPage,
  }) => {
    const transfer = authenticatedPage.fundsTransfer;
    const beneficiary = createBeneficiaryData();

    await transfer.open();
    await expect(transfer.addBeneficiaryButton).toBeVisible();

    await transfer.openAddBeneficiaryForm();
    await expect(transfer.addBeneficiaryHeading).toBeVisible();
    await transfer.fillBeneficiary(beneficiary);
    const createdBeneficiary = transfer.beneficiaryByName(beneficiary.name);
    try {
      await transfer.saveBeneficiary();
      await expect(createdBeneficiary).toBeVisible();
      await expect(createdBeneficiary).toContainText(beneficiary.bank);
    } finally {
      if ((await createdBeneficiary.count()) > 0) {
        await transfer.cancelAddBeneficiaryIfOpen();
        await transfer.deleteBeneficiary(beneficiary.name);
        await expect(transfer.deletionDialogHeading).toBeVisible();
        await transfer.confirmBeneficiaryDeletion();
        await expect(createdBeneficiary).toHaveCount(0);
      }
    }
  });

  test("BANK-TRSF-02: blocks a duplicate beneficiary account", async ({
    authenticatedPage,
  }) => {
    const transfer = authenticatedPage.fundsTransfer;
    const beneficiary = createBeneficiaryData();

    await transfer.open();
    await transfer.openAddBeneficiaryForm();
    await transfer.fillBeneficiary(beneficiary);
    await transfer.saveBeneficiary();

    const createdBeneficiary = transfer.beneficiaryByName(beneficiary.name);

    try {
      await expect(createdBeneficiary).toBeVisible();

      await transfer.openAddBeneficiaryForm();
      await transfer.fillBeneficiary(beneficiary);
      await transfer.saveBeneficiary();

      await expect(transfer.duplicateBeneficiaryError).toBeVisible();
      await expect(transfer.duplicateBeneficiaryError).toContainText(
        "Beneficiary with this account number already exists",
      );
      await expect(createdBeneficiary).toHaveCount(1);
    } finally {
      if ((await createdBeneficiary.count()) > 0) {
        await transfer.deleteBeneficiary(beneficiary.name);
        await expect(transfer.deletionDialogHeading).toBeVisible();
        await transfer.confirmBeneficiaryDeletion();
        await expect(createdBeneficiary).toHaveCount(0);
      }
    }
  });
});
