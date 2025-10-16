import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: any) {
    super(page);
    this.shoppingCartLink = this.page.locator('.shopping_cart_link');
    this.shoppingCartBadge = this.page.locator('.shopping_cart_badge');
  }

  async addProductToCart(productId: string) {
    await this.page.click(`[data-test="add-to-cart-${productId}"]`);
  }

  async addMultipleProductsToCart(productIds: string[]) {
    for (const productId of productIds) {
      await this.addProductToCart(productId);
    }
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async getProductCount(): Promise<number> {
    try {
      const badgeText = await this.shoppingCartBadge.textContent();
      return parseInt(badgeText || '0');
    } catch {
      return 0;
    }
  }
}
