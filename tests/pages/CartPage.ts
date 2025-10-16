import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;

  constructor(page: any) {
    super(page);
    this.checkoutButton = this.page.locator('[data-test="checkout"]');
  }

  async verifyCartItemsCount(expectedCount: number) {
    await expect(this.page.locator('.cart_item')).toHaveCount(expectedCount);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async removeItem(productId: string) {
    await this.page.click(`[data-test="remove-${productId}"]`);
  }
}
