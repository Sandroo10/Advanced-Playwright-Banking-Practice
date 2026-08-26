import type { Locator, Page } from "@playwright/test";

export class PasswordResetModal {
  readonly openButton: Locator;
  readonly emailInput: Locator;
  readonly sendOtpButton: Locator;
  readonly simulatedOtpMessage: Locator;
  readonly simulatedOtpCode: Locator;

  constructor(page: Page) {
    this.openButton = page.locator("#forgot-link");
    this.emailInput = page.locator('input[name="reset-email"]');
    this.sendOtpButton = page.locator("#send-otp");
    this.simulatedOtpMessage = page.getByText(/Simulated OTP sent/i);
    this.simulatedOtpCode = page.getByText("998877");
  }

  async requestOtp(email: string): Promise<void> {
    await this.openButton.click();
    await this.emailInput.fill(email);
    await this.sendOtpButton.click();
  }
}
