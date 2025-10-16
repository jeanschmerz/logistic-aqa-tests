import { test, expect } from '@playwright/test';
import { StartPage } from '../pages/StartPage';

let mainPage: StartPage;

test.describe('Тесты UI главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new StartPage(page);
    await mainPage.open();
  });

  test('Проверка отображения основных элементов UI', async () => {
    await mainPage.verifyPageLoaded();
  });

  test('Проверка отображения информации о логине', async () => {
    await mainPage.verifyLoginCredentialsDisplayed();
  });

  test('Проверка placeholder атрибутов', async () => {
    await mainPage.verifyUsernamePlaceholder();
    await mainPage.verifyPasswordPlaceholder();
  });
});
