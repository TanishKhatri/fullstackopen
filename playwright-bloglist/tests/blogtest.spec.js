const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ request, page }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        'username': 'testUser',
        'name': 'testUser',
        'password': 'testUser',
      }
    })
    await page.goto('/');
  });

  describe('Login', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('link', { name: 'login' }).click()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('Username:').fill('testUser');
      await page.getByLabel('Password:').fill('testUser');
      await page.getByRole('button', { name: 'Login'}).click();
      await expect(page.getByRole('button', { name: 'logout'})).toBeVisible();
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('Username:').fill('testUser');
      await page.getByLabel('Password:').fill('testUserNot');
      await page.getByRole('button', { name: 'Login'}).click();
      await expect(page.getByRole('button', { name: 'logout'})).not.toBeVisible();
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('link', { name: 'login' }).click()
      await page.getByLabel('Username:').fill('testUser');
      await page.getByLabel('Password:').fill('testUser');
      await page.getByRole('button', { name: 'Login'}).click();
    })

    describe('creates a blog', () => {
      beforeEach( async ({ page }) => {
        await page.getByRole('link', { name: 'new blog' }).click()
        await page.getByLabel('title').fill('title1')
        await page.getByLabel('author').fill('author1')
        await page.getByLabel('url').fill('url1')
        await page.getByRole('button', { name: 'create' }).click()
      })

      test('can create a blog', async ({ page }) => {
        await expect(page.getByRole('link', { name: `title1 by author1` })).toBeVisible()
      })

      test('can like a blog', async ({ page }) => {
        await page.getByRole('link', { name: `title1 by author1` }).click()
        await page.getByRole('button', { name: `like` }).click()
        await expect(page.getByText('likes 1', { exact: false })).toBeVisible()
      })

      test('can delete a blog', async ({ page }) => {
        await page.getByRole('link', { name: `title1 by author1` }).click()
        await page.getByRole('button', { name: `remove` }).click()
        await expect(page).toHaveURL('/');
        await expect(page.getByText('title1 by author1')).not.toBeVisible()
      })
    })
  });
});