import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveURL('/login')
    
    await page.fill('input[type="email"]', 'admin@reddix.com')
    await page.fill('input[type="password"]', 'admin123')
    await page.click('button[type="submit"]')
    
    await page.waitForURL('/', { timeout: 10000 })
    await expect(page.locator('h1:has-text("Аналитика продаж")')).toBeVisible({ timeout: 10000 })
  })

  test('should logout successfully', async ({ page }) => {
    await page.goto('/')
    
    await page.fill('input[type="email"]', 'admin@reddix.com')
    await page.fill('input[type="password"]', 'admin123')
    await page.click('button[type="submit"]')
    
    await page.waitForURL('/', { timeout: 10000 })
    
    await page.click('text=Выйти')
    
    await expect(page).toHaveURL('/login')
  })
})
