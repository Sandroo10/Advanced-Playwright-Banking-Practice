import { expect, test as base } from "@playwright/test";
import { users } from "../data/users";
import { DashboardPage } from "../pages/dashboard.page";
import { LoginPage } from "../pages/login.page";
type Fixtures = { authenticatedPage: DashboardPage };

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    const dashboard = new DashboardPage(page);
    await expect(dashboard.accountsSummary.welcomeBanner).toBeVisible();
    await use(dashboard);
  },
});
