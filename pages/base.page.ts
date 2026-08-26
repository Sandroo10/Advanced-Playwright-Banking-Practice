import type { Page } from "@playwright/test";

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path = ""): Promise<void> {
    await this.page.goto(path);
  }
}
