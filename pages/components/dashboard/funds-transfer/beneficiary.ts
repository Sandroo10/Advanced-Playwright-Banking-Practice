import type { Locator, Page } from "@playwright/test";
import type { BeneficiaryData } from "../../../../data/builders/beneficiary.builder";

export class FundsTransferComponent {
  readonly transfersTab: Locator;
  readonly transferTypeSelect: Locator;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;
  readonly transferAmountInput: Locator;
  readonly executeTransferButton: Locator;
  readonly transferSuccessMessage: Locator;
  readonly addBeneficiaryButton: Locator;
  readonly addBeneficiaryHeading: Locator;
  readonly beneficiaryNameInput: Locator;
  readonly beneficiaryAccountInput: Locator;
  readonly beneficiaryBankSelect: Locator;
  readonly saveBeneficiaryButton: Locator;
  readonly cancelBeneficiaryButton: Locator;
  readonly beneficiaryItems: Locator;
  readonly duplicateBeneficiaryError: Locator;
  readonly editBeneficiaryHeading: Locator;
  readonly editBeneficiaryNicknameInput: Locator;
  readonly saveBeneficiaryChangesButton: Locator;
  readonly deletionDialogHeading: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.transfersTab = page.locator("#tab-transfers");
    this.transferTypeSelect = page.locator("#transfer-type");
    this.fromAccountSelect = page.locator("#from-acc");
    this.toAccountSelect = page.locator("#to-acc");
    this.transferAmountInput = page.locator("#transfer-amount");
    this.executeTransferButton = page.locator("#exec-transfer");
    this.transferSuccessMessage = page.locator(".transfer-success-msg");
    this.addBeneficiaryButton = page.locator("#add-beneficiary");
    this.addBeneficiaryHeading = page.getByRole("heading", {
      name: "Add New Beneficiary",
    });
    this.beneficiaryNameInput = page.locator("#bene-name");
    this.beneficiaryAccountInput = page.locator("#bene-account");
    this.beneficiaryBankSelect = page.locator("#bene-bank");
    this.saveBeneficiaryButton = page.locator("#save-bene");
    this.cancelBeneficiaryButton = page.getByRole("button", {
      name: "Cancel",
      exact: true,
    });
    this.beneficiaryItems = page.locator(".beneficiary-item");
    this.duplicateBeneficiaryError = page.locator(".bene-error-alert");
    this.editBeneficiaryHeading = page.getByRole("heading", {
      name: "Edit Beneficiary Details",
    });
    this.editBeneficiaryNicknameInput = page.locator("#edit-bene-nickname");
    this.saveBeneficiaryChangesButton = page.locator("#save-bene-changes");
    this.deletionDialogHeading = page.getByRole("heading", {
      name: "Confirm Beneficiary Deletion",
    });
    this.confirmDeleteButton = page.locator("button.confirm-btn");
  }

  async open(): Promise<void> {
    await this.transfersTab.click();
  }

  async executeInternalTransfer(
    fromAccount: string,
    toAccount: string,
    amount: string,
  ): Promise<void> {
    await this.transferTypeSelect.selectOption("internal");
    await this.fromAccountSelect.selectOption(fromAccount);
    await this.toAccountSelect.selectOption(toAccount);
    await this.transferAmountInput.fill(amount);
    await this.executeTransferButton.click();
  }

  async openAddBeneficiaryForm(): Promise<void> {
    await this.addBeneficiaryButton.click();
  }

  async fillBeneficiary(data: BeneficiaryData): Promise<void> {
    await this.beneficiaryNameInput.fill(data.name);
    await this.beneficiaryAccountInput.fill(data.accountNumber);
    await this.beneficiaryBankSelect.selectOption(data.bank);
  }

  async saveBeneficiary(): Promise<void> {
    await this.saveBeneficiaryButton.click();
  }

  async editBeneficiary(name: string): Promise<void> {
    await this.beneficiaryByName(name).locator("button.edit-bene").click();
  }

  async fillEditedBeneficiaryNickname(nickname: string): Promise<void> {
    await this.editBeneficiaryNicknameInput.fill(nickname);
  }

  async saveBeneficiaryChanges(): Promise<void> {
    await this.saveBeneficiaryChangesButton.click();
  }

  async cancelAddBeneficiaryIfOpen(): Promise<void> {
    for (const button of await this.cancelBeneficiaryButton.all()) {
      if (await button.isVisible()) {
        await button.click();
        return;
      }
    }
  }

  async cancelEditBeneficiaryIfOpen(): Promise<void> {
    for (const button of await this.cancelBeneficiaryButton.all()) {
      if (await button.isVisible()) {
        await button.click();
        return;
      }
    }
  }

  async deleteBeneficiary(name: string): Promise<void> {
    await this.beneficiaryByName(name).locator("button.delete-bene").click();
  }

  async confirmBeneficiaryDeletion(): Promise<void> {
    await this.confirmDeleteButton.click();
  }

  beneficiaryByName(name: string): Locator {
    return this.beneficiaryItems.filter({ hasText: name });
  }
}
