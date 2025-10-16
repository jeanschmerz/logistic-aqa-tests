import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class StartPage extends BasePage {
  readonly swagLabsHeader: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly acceptedUsernamesHeading: Locator;
  readonly loginCredentials: Locator;
  readonly passwordHeading: Locator;
  readonly loginPassword: Locator;

  constructor(page: any) {
    super(page);
    this.swagLabsHeader = this.page.getByText('Swag Labs');
    this.usernameInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
    this.acceptedUsernamesHeading = this.page.getByRole('heading', {
      name: 'Accepted usernames are:',
    });
    this.loginCredentials = this.page.locator('[data-test="login-credentials"]');
    this.passwordHeading = this.page.getByRole('heading', { name: 'Password for all users:' });
    this.loginPassword = this.page.locator('[data-test="login-password"]');
  }

  async open() {
    await this.navigateTo('/');
  }

  async verifyPageLoaded() {
    await expect(this.swagLabsHeader).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async verifyLoginCredentialsDisplayed() {
    await expect(this.acceptedUsernamesHeading).toBeVisible();
    await expect(this.loginCredentials).toBeVisible();
    await expect(this.passwordHeading).toBeVisible();
    await expect(this.loginPassword).toBeVisible();
  }

  async verifyUsernamePlaceholder() {
    await expect(this.usernameInput).toHaveAttribute('placeholder', 'Username');
  }

  async verifyPasswordPlaceholder() {
    await expect(this.passwordInput).toHaveAttribute('placeholder', 'Password');
  }
}
