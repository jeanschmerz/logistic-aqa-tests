import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;

  constructor(page: any) {
    super(page);
    this.firstNameInput = this.page.locator('[data-test="firstName"]');
    this.lastNameInput = this.page.locator('[data-test="lastName"]');
    this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
    this.continueButton = this.page.locator('[data-test="continue"]');
    this.finishButton = this.page.locator('[data-test="finish"]');
  }

  async fillShippingInfo(info: CheckoutInfo) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async verifyOrderSummaryVisible() {
    await expect(this.page.locator('.summary_info')).toBeVisible();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async verifyOrderCompletion(expectedText: string) {
    await expect(this.page.locator('.complete-header')).toHaveText(expectedText);
  }
}
