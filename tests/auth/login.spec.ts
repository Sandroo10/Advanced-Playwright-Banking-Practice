import { test, expect } from "@playwright/test";
import { users } from "../../data/users";
import { LoginPage } from "../../pages/login.page";

test.describe("Authentication | BANK-AUTH", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).open();
  });

  test("BANK-AUTH-01: standard user can log in @smoke", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(users.standard.username, users.standard.password);
    await expect(page.getByText(/Welcome back,? Apex User/i)).toBeVisible();
  });

  test("BANK-AUTH-02: invalid password is rejected", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(users.standard.username, "WrongPass");
    await expect(page.getByText(/invalid username or password/i)).toBeVisible();
    await expect(login.loginForm.loginButton).toBeVisible();
  });

  test("BANK-AUTH-03: Verify that login fails with an unregistered username", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.login(users.unregistered.username, users.unregistered.password);
    await expect(page.getByText(/invalid username or password/i)).toBeVisible();
    await expect(login.loginForm.loginButton).toBeVisible();
  });

  test("BANK-AUTH-04: Verify that a user can request a password reset OTP", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await expect(login.passwordResetModal.openButton).toBeVisible();
    await login.requestPasswordReset("user@apex.com");
    await expect(login.passwordResetModal.simulatedOtpMessage).toBeVisible();
    await expect(login.passwordResetModal.simulatedOtpCode).toBeVisible();
  });

  test("BANK-AUTH-05: Valid 2FA OTP login", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(users.twoFactor.username, users.twoFactor.password);
    await expect(login.loginForm.otpInput).toBeVisible();
    await expect(login.loginForm.otpCode).toBeVisible();
    await login.loginForm.submitOtp();
    await expect(page.getByText(/Welcome back,? Apex User/i)).toBeVisible();
  });
});
