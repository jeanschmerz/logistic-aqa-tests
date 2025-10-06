import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name?: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class StartPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator => page.getByText('Swag Labs'),
        name: 'Swag Labs Header',
        text: 'Swag Labs',
      },
      {
        locator: (page: Page): Locator => page.locator('[data-test="username"]'),
        name: 'placeholder_Username',
        attribute: {
          type: 'placeholder',
          value: 'Username',
        },
      },
      {
        locator: (page: Page): Locator => page.locator('[data-test="password"]'),
        name: 'placeholder_Password',
        attribute: {
          type: 'placeholder',
          value: 'Password',
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('heading', { name: 'Accepted usernames are:' }),
        name: 'Accepted usernames are:',
        text: 'Accepted usernames are:',
      },
      {
        locator: (page: Page): Locator => page.locator('[data-test="login-credentials"]'),
        name: 'Login Credentials List',
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('heading', { name: 'Password for all users:' }),
        name: 'Password for all users:',
        text: 'Password for all users:',
      },
      {
        locator: (page: Page): Locator => page.locator('[data-test="login-password"]'),
        name: 'Login Password Lists',
      },
    ];
  }

  async openStartPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }
  async checkElementsVisibility() {
    for (const { locator, name } of this.elements) {
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }
  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await test.step(`Проверка названия элемента ${name}`, async () => {
          await expect.soft(locator(this.page)).toContainText(text);
        });
      }
    }
  }
  async checkElementsHrefAttribute() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        await test.step(`Проверка атрибута href элемента ${name}`, async () => {
          await expect.soft(locator(this.page)).toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    }
  }
}
