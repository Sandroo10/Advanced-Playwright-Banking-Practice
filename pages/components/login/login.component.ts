import type { Locator, Page } from "@playwright/test";

export class LoginComponent {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.username = page.getByPlaceholder("Enter username");
    this.password = page.getByPlaceholder("Enter password");
    this.loginButton = page.getByRole("button", { name: "LOGIN" });
  }

  async submit(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
