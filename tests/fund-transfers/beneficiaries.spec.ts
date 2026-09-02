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
        await transfer.cancelAddBeneficiaryIfOpen();
        await transfer.deleteBeneficiary(beneficiary.name);
        await expect(transfer.deletionDialogHeading).toBeVisible();
        await transfer.confirmBeneficiaryDeletion();
        await expect(createdBeneficiary).toHaveCount(0);
      }
    }
  });

  test("BANK-TRSF-03: edits a beneficiary nickname", async ({
    authenticatedPage,
  }) => {
    const transfer = authenticatedPage.fundsTransfer;
    const beneficiary = createBeneficiaryData();
    const editedName = `${beneficiary.name} Updated`;

    await transfer.open();
    await transfer.openAddBeneficiaryForm();
    await expect(transfer.addBeneficiaryHeading).toBeVisible();
    await transfer.fillBeneficiary(beneficiary);
    const createdBeneficiary = transfer.beneficiaryByName(beneficiary.name);

    try {
      await transfer.saveBeneficiary();
      await expect(createdBeneficiary).toBeVisible();

      await transfer.editBeneficiary(beneficiary.name);
      await expect(transfer.editBeneficiaryHeading).toBeVisible();
      await expect(transfer.editBeneficiaryNicknameInput).toHaveValue(
        beneficiary.name,
      );

      await transfer.fillEditedBeneficiaryNickname(editedName);
      await transfer.saveBeneficiaryChanges();

      const updatedBeneficiary = transfer.beneficiaryByName(editedName);
      await expect(updatedBeneficiary).toBeVisible();
      await expect(updatedBeneficiary.locator("h4")).toHaveText(editedName);
    } finally {
      await transfer.cancelEditBeneficiaryIfOpen();

      const updatedBeneficiary = transfer.beneficiaryByName(editedName);
      const beneficiaryToDelete =
        (await updatedBeneficiary.count()) > 0
          ? updatedBeneficiary
          : createdBeneficiary;

      if ((await beneficiaryToDelete.count()) > 0) {
        const nameToDelete =
          (await updatedBeneficiary.count()) > 0
            ? editedName
            : beneficiary.name;
        await transfer.deleteBeneficiary(nameToDelete);
        await expect(transfer.deletionDialogHeading).toBeVisible();
        await transfer.confirmBeneficiaryDeletion();
        await expect(beneficiaryToDelete).toHaveCount(0);
      }
    }
  });

  test("BANK-TRSF-04: deletes a beneficiary", async ({ authenticatedPage }) => {
    const transfer = authenticatedPage.fundsTransfer;
    const beneficiary = createBeneficiaryData();

    await transfer.open();
    await transfer.openAddBeneficiaryForm();
    await expect(transfer.addBeneficiaryHeading).toBeVisible();
    await transfer.fillBeneficiary(beneficiary);

    const createdBeneficiary = transfer.beneficiaryByName(beneficiary.name);

    await transfer.saveBeneficiary();
    await expect(createdBeneficiary).toBeVisible();

    await transfer.deleteBeneficiary(beneficiary.name);
    await expect(transfer.deletionDialogHeading).toBeVisible();
    await transfer.confirmBeneficiaryDeletion();
    await expect(createdBeneficiary).toHaveCount(0);
  });
});
