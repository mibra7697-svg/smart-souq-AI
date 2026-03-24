import { test, expect } from '@playwright/test';

test.describe('Seller Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
  });

  test('dashboard loads correctly', async ({ page }) => {
    // Check main dashboard elements (Arabic UI)
    await expect(page.getByText('نظرة عامة على لوحة التحكم')).toBeVisible();
    await expect(page.getByText('محفظتي')).toBeVisible();
    await expect(page.getByText('ملخص الطلبات')).toBeVisible();
    await expect(page.getByText('الملخص المالي')).toBeVisible();
  });

  test('navigation works correctly', async ({ page }) => {
    // Test navigation to different pages using Arabic labels
    await page.getByRole('link', { name: 'طلباتي' }).click();
    await expect(page.getByText('طلباتي')).toBeVisible();
    
    await page.getByRole('link', { name: 'عمولاتي' }).click();
    await expect(page.getByText('عمولاتي')).toBeVisible();
    
    await page.getByRole('link', { name: 'المدفوعات' }).click();
    await expect(page.getByText('طلبات السحب')).toBeVisible();
    
    await page.getByRole('link', { name: 'لوحة التحكم' }).click();
    await expect(page.getByText('نظرة عامة على لوحة التحكم')).toBeVisible();
  });

  test('orders page loads and displays data', async ({ page }) => {
    await page.getByRole('link', { name: 'طلباتي' }).click();
    
    // Check if orders table is visible
    await expect(page.getByText('طلباتي')).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
    
    // Check for filter buttons (Arabic labels)
    await expect(page.getByRole('button', { name: 'الكل' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'تم التوصيل' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'قيد الانتظار' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'مسترجع' })).toBeVisible();
  });

  test('commissions page loads and displays data', async ({ page }) => {
    await page.getByRole('link', { name: 'عمولاتي' }).click();
    
    // Check if commissions page is loaded
    await expect(page.getByText('عمولاتي')).toBeVisible();
    await expect(page.getByText('إجمالي الأرباح')).toBeVisible();
    
    // Check for table
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('payouts page loads and displays form', async ({ page }) => {
    await page.getByRole('link', { name: 'المدفوعات' }).click();
    
    // Check if payouts page is loaded
    await expect(page.getByText('طلبات السحب')).toBeVisible();
    await expect(page.getByText('طلب سحب جديد')).toBeVisible();
    
    // Check for form elements
    await expect(page.getByLabel('المبلغ ($)')).toBeVisible();
    await expect(page.getByRole('button', { name: 'طلب السحب' })).toBeVisible();
  });

  test('logout functionality works', async ({ page }) => {
    // Test logout
    await page.getByRole('button', { name: 'تسجيل الخروج' }).click();
    
    // Should redirect to login page
    await page.waitForURL('**/auth/login');
    await expect(page.getByText('سجّل دخولك للمتابعة')).toBeVisible();
  });
});
