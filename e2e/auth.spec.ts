import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveURL('/login')
    
    await page.fill('input[type="email"]', 'admin@test.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    await expect(page).toHaveURL('/')
    await expect(page.locator('text=Reddix')).toBeVisible()
  })

  test('should logout successfully', async ({ page }) => {
    await page.goto('/')
    
    await page.fill('input[type="email"]', 'admin@test.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    await page.click('text=Выйти')
    
    await expect(page).toHaveURL('/login')
  })
})
