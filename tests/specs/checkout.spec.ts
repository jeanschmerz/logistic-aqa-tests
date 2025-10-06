import { test, expect } from '@playwright/test';
import { credentials, checkoutInfo } from '../fixtures/testData';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.describe('Проверка логина', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });
  test('Заказ товара (полный цикл)', async ({ page }) => {
    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL(/inventory\.html/);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(2);

    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', checkoutInfo.firstName);
    await page.fill('[data-test="lastName"]', checkoutInfo.lastName);
    await page.fill('[data-test="postalCode"]', checkoutInfo.postalCode);
    await page.click('[data-test="continue"]');

    await expect(page.locator('.summary_info')).toBeVisible();

    await page.click('[data-test="finish"]');

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});
