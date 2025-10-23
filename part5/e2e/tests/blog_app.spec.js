const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const header = page.getByText('Login')
    const usernameInput = page.getByLabel('Username')
    const passwordInput = page.getByLabel('Password')
    const loginButton = page.getByRole('button', { name: 'Log in' })

    await expect.soft(header).toBeVisible();
    await expect.soft(usernameInput).toBeVisible();
    await expect.soft(passwordInput).toBeVisible();
    await expect.soft(loginButton).toBeVisible();

    expect(test.info().errors).toHaveLength(0);
  })
})
