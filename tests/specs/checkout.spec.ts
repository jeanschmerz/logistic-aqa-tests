import { test, expect } from '@playwright/test';
import { checkoutInfo } from '../fixtures/fixtures';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../config/credentials';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductsPage } from '../pages/ProductsPage';

const testProducts = ['sauce-labs-backpack', 'sauce-labs-bike-light'];

test.describe('Полный цикл оформления заказа', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Успешное оформление заказа с двумя товарами', async ({ page }) => {
    await test.step('Добавление товаров в корзину', async () => {
      for (const product of testProducts) {
        await productsPage.addProductToCart(product);
      }
    });

    await test.step('Проверка товаров в корзине', async () => {
      await productsPage.goToCart();
      await cartPage.verifyCartItemsCount(testProducts.length);
    });
    await test.step('Начало оформления заказа', async () => {
      await cartPage.proceedToCheckout();
    });

    await test.step('Заполнение информации о доставке', async () => {
      await checkoutPage.fillShippingInfo(checkoutInfo);
      await checkoutPage.continueToOverview();
    });
    await test.step('Финальная проверка страницы заказа', async () => {
      await checkoutPage.verifyOrderSummaryVisible();
    });
    await test.step('Завершение заказа', async () => {
      await checkoutPage.finishOrder();
    });
    await test.step('Проверка подтверждения оформления заказа', async () => {
      await checkoutPage.verifyOrderCompletion('Thank you for your order!');
    });
  });
});
