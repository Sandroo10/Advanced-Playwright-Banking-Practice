import type { Locator, Page } from "@playwright/test";

export class LoginComponent {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly otpCode: Locator;
  readonly otpInput: Locator;
  readonly otpVerifyButton: Locator;

  constructor(page: Page) {
    this.username = page.getByPlaceholder("Enter username");
    this.password = page.getByPlaceholder("Enter password");
    this.loginButton = page.getByRole("button", { name: "LOGIN" });
    this.otpCode = page.locator(".otp-display-code");
    this.otpInput = page.getByPlaceholder("Enter 6-digit OTP");
    this.otpVerifyButton = page.getByRole("button", { name: "Verify" });
  }

  async submit(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async submitOtp(): Promise<void> {
    const otpText = await this.otpCode.textContent();
    await this.otpInput.fill(otpText ?? '');
    await this.otpVerifyButton.click();
  }
}
