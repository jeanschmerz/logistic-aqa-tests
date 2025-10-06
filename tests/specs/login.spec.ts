import { test, expect } from '@playwright/test';
import { credentials } from '../fixtures/testData';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.describe('Проверка логина', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });
  test('Проверка успешного логина (валидные креды)', async ({ page }) => {
    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect.soft(loginPage.page.locator('.inventory_list')).toBeVisible();
  });

  test('Проверка неуспешного логина (невалидные креды)', async () => {
    await loginPage.login('invalid_user', 'invalid_password');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
