import { test, expect } from '@playwright/test';
import { credentials } from '../config/credentials';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.describe('Проверка логина', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });
  test('Проверка успешного логина (валидные креды)', async ({ page }) => {
    await test.step('Ввод валидной пары логин/пароль', async () => {
      await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    });
    await test.step('Переход на страницу каталога', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
    });
    await test.step('Проверка видимости заголовка', async () => {
      await expect.soft(loginPage.inventoryHeader).toBeVisible();
    });
  });

  test('Проверка неуспешного логина (невалидные креды)', async () => {
    await test.step('Ввод невалидной пары логин/пароль', async () => {
      await loginPage.login(credentials.invalidUser.username, credentials.invalidUser.password);
    });
    await test.step('Проверка отображения сообщения об ошибке', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
    });
  });
});
