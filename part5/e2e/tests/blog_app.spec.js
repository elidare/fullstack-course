const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

const testUser1 = {
  name: 'Test User',
  username: 'test_user',
  password: 'pswd'
}
const testUser2 = {
  name: 'Test User 2',
  username: 'test_user_2',
  password: 'pswd2'
}
const newBlog = {
  title: 'New blog',
  author: 'Blog author',
  url: 'url.url'
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: testUser1
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
      await loginWith(page, testUser1.username, testUser1.password)
      await expect(page.getByText(`${testUser1.name} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, testUser1.username, 'wrong')
      await expect(page.locator('.error')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, testUser1.username, testUser1.password)
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, newBlog)

      const blog = page.getByText(`${newBlog.title} ${newBlog.author}`)
      await expect(blog).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, newBlog)
      await page.getByRole('button', { name: 'View' }).click()
      await expect(page.getByText('Likes 0')).toBeVisible();

      await page.getByRole('button', { name: 'Like' }).click()

      await expect(page.getByText('Likes 1')).toBeVisible();
    })

    test('a blog can be deleted by the added user', async ({ page }) => {
      await createBlog(page, newBlog)
      await page.getByRole('button', { name: 'View' }).click()

      page.on('dialog', dialog => dialog.accept()) // window.confirm registered before clicking

      await page.getByRole('button', { name: 'Delete' }).click()

      const blog = page.getByText(`${newBlog.title} ${newBlog.author}`)
      await expect(blog).not.toBeVisible()
    })

    test('only the user who added the blog sees the blog\'s delete button', async ({ page, request }) => {
      // User is logged in and creates a blog
      await createBlog(page, newBlog)
      await page.getByRole('button', { name: 'View' }).click()

      // Check that this user sees the Delete button
      await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible()

      // Log out
      await page.getByRole('button', { name: 'Log out' }).click()

      // Log in as different user
      await request.post('/api/users', {
        data: testUser2
      })
      await loginWith(page, testUser2.username, testUser2.password)

      // Check that Delete button is not visible
      await page.getByRole('button', { name: 'View' }).click()
      await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
    })
  })
})
