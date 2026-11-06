import { test, expect } from '@playwright/test';

// This list comes from the assignment, independently of the page's data module.
const products = [
  ['motor', 'تأمين المركبات للأفراد'],
  ['fleet', 'تأمين أسطول المركبات'],
  ['business-health', 'التأمين الطبي للشركات والمنشآت'],
  ['malpractice', 'تأمين الأخطاء الطبية'],
  ['domestic', 'تأمين العمالة المنزلية'],
  ['travel', 'تأمين السفر'],
  ['residency', 'تأمين الإقامة المميزة'],
  ['savings', 'تأمين الحماية والادخار'],
  ['cargo', 'تأمين نقل البضائع'],
  ['home', 'تأمين المنازل'],
];

async function choose(page, label) {
  const radio = page.getByRole('radio', { name: label, exact: true });
  // The styled label is the pointer target; the native input remains keyboard accessible.
  await radio.locator('..').click();
  await expect(radio).toBeChecked();
}

test('all ten requested products open distinct previews without submitting data', async ({ page }) => {
  const errors = [];
  const writes = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method())) writes.push(request.url()); });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('group', { name: 'منتجات التأمين', exact: true }).getByRole('button')).toHaveCount(10);
  for (const [id, title] of products) {
    const button = page.getByRole('button', { name: title, exact: true });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page).toHaveURL(new RegExp(`product=${id}(?:&|$)`));
    await expect(page.locator('#insurance-start').getByRole('heading')).toHaveText(title);
    const preview = page.getByRole('button', { name: 'عرض مسار التأمين', exact: true });
    await preview.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading')).toHaveText(`مسارك إلى ${title}`);
    await expect(dialog.locator('ol li')).toHaveCount(4);
    await expect(dialog.getByText(/لم يتم إرسال طلب أو إصدار وثيقة/)).toBeVisible();
    await dialog.getByRole('button', { name: 'العودة إلى الخيارات', exact: true }).click();
    await expect(dialog).not.toBeVisible();
    await expect(preview).toBeFocused();
  }
  expect(errors).toEqual([]);
  expect(writes).toEqual([]);
});

test('motor, domestic worker and cargo variants survive refresh and browser history', async ({ page }) => {
  await page.goto('/?product=motor#insurance');
  await choose(page, 'نقل ملكية');
  await choose(page, 'شامل');
  await page.reload();
  await expect(page.getByRole('radio', { name: 'نقل ملكية', exact: true })).toBeChecked();
  await expect(page.getByRole('radio', { name: 'شامل', exact: true })).toBeChecked();
  await choose(page, 'بطاقة جمركية');
  await page.getByRole('radio', { name: 'ضد الغير بلس', exact: true }).focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('radio', { name: 'ضد الغير بلس', exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'تأمين العمالة المنزلية', exact: true }).click();
  await choose(page, 'التأمين التعاقدي');
  await page.reload();
  await expect(page.getByRole('radio', { name: 'التأمين التعاقدي', exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'تأمين نقل البضائع', exact: true }).click();
  for (const mode of ['بحري', 'بري', 'جوي']) await choose(page, mode);
  await choose(page, 'تصدير');
  await page.reload();
  await expect(page.getByRole('radio', { name: 'جوي', exact: true })).toBeChecked();
  await expect(page.getByRole('radio', { name: 'تصدير', exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'تأمين المنازل', exact: true }).click();
  await page.goBack();
  await expect(page.getByRole('radio', { name: 'جوي', exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'عرض مسار التأمين' }).click();
  await expect(page.getByRole('dialog').getByText('جوي', { exact: true })).toBeVisible();
  await expect(page.getByRole('dialog').getByText('تصدير', { exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('audience filters and footer links keep the selected journey accessible', async ({ page }) => {
  await page.goto('/#insurance');
  const group = page.getByRole('group', { name: 'منتجات التأمين', exact: true });
  await page.getByRole('button', { name: 'للأعمال', exact: true }).click();
  await expect(group.getByRole('button')).toHaveCount(3);
  await expect(group.getByRole('button', { name: 'تأمين أسطول المركبات', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'للأفراد', exact: true }).click();
  await expect(group.getByRole('button')).toHaveCount(7);
  await page.getByRole('button', { name: 'جميع المنتجات', exact: true }).click();
  await expect(group.getByRole('button')).toHaveCount(10);
  for (const label of ['نقل البضائع', 'المنازل']) {
    await page.getByRole('contentinfo').getByRole('link', { name: label, exact: true }).click();
    await expect(page.locator('#insurance-heading')).toBeInViewport();
    await expect(page.locator('#insurance-start').getByRole('heading')).toContainText(label);
  }
  // A choice changes the preview in place; it must not jump back to the hero.
  await page.getByRole('button', { name: 'تأمين العمالة المنزلية', exact: true }).click();
  await choose(page, 'التأمين التعاقدي');
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(100);
});

test('navigation, FAQ and informational dialogs work with keyboard and touch', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: 'فتح القائمة', exact: true }).click();
    await expect(page.getByRole('navigation', { name: 'قائمة الجوال' })).toBeVisible();
    await page.getByRole('navigation', { name: 'قائمة الجوال' }).getByRole('link', { name: 'الأسئلة الشائعة', exact: true }).click();
    await expect(page.getByRole('button', { name: 'فتح القائمة', exact: true })).toHaveAttribute('aria-expanded', 'false');
  } else {
    await page.getByRole('navigation', { name: 'القائمة الرئيسية' }).getByRole('link', { name: 'الأسئلة الشائعة', exact: true }).click();
  }
  await expect(page.locator('#faq-heading')).toBeInViewport();
  const faq = page.locator('#faq details').first();
  await faq.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(faq).toHaveAttribute('open', '');
  await expect(faq.locator('p')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(faq).not.toHaveAttribute('open', '');
  await page.getByRole('contentinfo').getByRole('button', { name: 'الخصوصية والشروط', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('contentinfo').getByRole('button', { name: 'الخصوصية والشروط', exact: true })).toBeFocused();
  await page.getByRole('banner').getByRole('link', { name: 'سليم — الصفحة الرئيسية', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
});

test('assets, all sections and all products fit narrow and wide screens', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect.poll(() => page.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
    // Cover the longest heading and widest option groups; all ten destinations
    // are exercised above on both desktop and mobile.
    for (const [id, title] of products.filter(([id]) => ['motor', 'business-health', 'cargo'].includes(id))) {
      await page.getByRole('button', { name: title, exact: true }).click();
      await expect(page.locator('#insurance-start').getByRole('heading')).toHaveText(title);
      const fits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
      expect(fits, `${id} at ${width}px`).toBe(true);
    }
    await page.getByRole('button', { name: 'عرض مسار التأمين' }).click();
    await expect(page.getByRole('dialog')).toBeInViewport();
    expect(await page.getByRole('dialog').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    await page.getByRole('button', { name: 'إغلاق', exact: true }).click();
  }
  expect(errors).toEqual([]);
});
