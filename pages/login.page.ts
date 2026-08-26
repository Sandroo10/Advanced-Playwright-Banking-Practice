import type { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { LoginComponent } from "./components/login/login.component";
import { PasswordResetModal } from "./components/login/password-reset.modal";

export class LoginPage extends BasePage {
  readonly loginForm: LoginComponent;
  readonly passwordResetModal: PasswordResetModal;

  constructor(page: Page) {
    super(page);
    this.loginForm = new LoginComponent(page);
    this.passwordResetModal = new PasswordResetModal(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.loginForm.submit(username, password);
  }

  async requestPasswordReset(email: string): Promise<void> {
    await this.passwordResetModal.requestOtp(email);
  }
}
