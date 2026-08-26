import { test as base, expect } from "@playwright/test";
import { users } from "../data/users";
import { DashboardPage } from "../pages/dashboard.page";
import { LoginPage } from "../pages/login.page";
type Fixtures = { authenticatedPage: DashboardPage };

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    await use(new DashboardPage(page));
  },
});
