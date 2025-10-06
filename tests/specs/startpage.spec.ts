import { test, expect } from '@playwright/test';
import { StartPage } from '../pages/StartPage';

let mainPage: StartPage;

test.describe('Тесты UI главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new StartPage(page);
    await mainPage.openStartPage();
  });
  test(`Проверка отображения элементов UI`, async ({ page }) => {
    await mainPage.checkElementsVisibility();
  });
  test('Проверка названий элементов элементов UI', async ({ page }) => {
    await mainPage.checkElementsText();
  });
  test('Проверка содержимого href элементов UI', async ({ page }) => {
    await mainPage.checkElementsHrefAttribute();
  });
});
