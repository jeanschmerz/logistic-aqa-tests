import { Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly baseURL: string = 'https://www.saucedemo.com';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string = '') {
    await this.page.goto(`${this.baseURL}${path}`);
  }
}
