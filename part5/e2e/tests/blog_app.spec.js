const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'test_user',
        password: 'pswd'
      }
    })

    await page.goto('/')
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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test_user', 'pswd')
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test_user', 'wrong')
      await expect(page.locator('.error')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test_user', 'pswd')
    })

    test('a new blog can be created', async ({ page }) => {
      const newBlog = {
        title: 'New blog',
        author: 'Blog author',
        url: 'url.url'
      }

      await createBlog(page, newBlog)

      const blog = page.getByText(`${newBlog.title} ${newBlog.author}`)
      await expect(blog).toBeVisible()
    })
  })
})
