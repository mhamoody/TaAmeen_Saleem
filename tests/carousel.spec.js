import { test, expect } from '@playwright/test';

const slides = [
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

function carousel(page) {
  return page.getByRole('region', { name: 'صور مسارات التأمين', exact: true });
}

async function letCarouselRun(page) {
  // Leave focus and pointer outside the controls without scrolling the mobile
  // carousel out of view; it intentionally stops while offscreen or focused.
  await page.evaluate(() => document.activeElement?.blur());
  await page.mouse.move(0, 0);
  await page.clock.runFor(32);
}

test('hero advances after four seconds and obeys pause and resume', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.clock.install({ time: new Date('2026-11-06T12:00:00Z') });
  await page.clock.pauseAt(new Date('2026-11-06T12:00:01Z'));
  await page.goto('/');
  const region = carousel(page);
  await region.scrollIntoViewIfNeeded();
  await expect(region).toHaveAttribute('data-active-slide', 'motor');
  await letCarouselRun(page);
  await page.clock.runFor(3500);
  await expect(region).toHaveAttribute('data-active-slide', 'motor');
  await page.clock.runFor(1000);
  await expect(region).toHaveAttribute('data-active-slide', 'fleet');

  await region.getByRole('button', { name: 'إيقاف التبديل التلقائي', exact: true }).click();
  await letCarouselRun(page);
  await page.clock.runFor(8000);
  await expect(region).toHaveAttribute('data-active-slide', 'fleet');
  await region.getByRole('button', { name: 'تشغيل التبديل التلقائي', exact: true }).click();
  await letCarouselRun(page);
  await page.clock.runFor(4100);
  await expect(region).toHaveAttribute('data-active-slide', 'business-health');
});

test('reduced motion stays still while photo clicks, dots and RTL keyboard navigation work', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install({ time: new Date('2026-11-06T12:00:00Z') });
  await page.clock.pauseAt(new Date('2026-11-06T12:00:01Z'));
  await page.goto('/');
  const region = carousel(page);
  await region.scrollIntoViewIfNeeded();
  await letCarouselRun(page);
  await page.clock.runFor(12000);
  await expect(region).toHaveAttribute('data-active-slide', 'motor');
  await region.getByRole('button', { name: 'الصورة التالية', exact: true }).click();
  await expect(region).toHaveAttribute('data-active-slide', 'fleet');

  const sources = new Set();
  for (const [id, title] of slides) {
    const dot = region.getByRole('button', { name: `عرض ${title}`, exact: true });
    await dot.click();
    await expect(dot).toHaveAttribute('aria-current', 'true');
    await expect(region).toHaveAttribute('data-active-slide', id);
    const photo = region.getByRole('button', { name: 'الصورة التالية', exact: true }).locator('img');
    await expect.poll(() => photo.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
    sources.add(await photo.getAttribute('src'));
  }
  expect(sources.size).toBe(10);
  await region.getByRole('button', { name: 'الشريحة التالية', exact: true }).click();
  await expect(region).toHaveAttribute('data-active-slide', 'motor');
  await page.keyboard.press('ArrowRight');
  await expect(region).toHaveAttribute('data-active-slide', 'home');
  await page.keyboard.press('ArrowLeft');
  await expect(region).toHaveAttribute('data-active-slide', 'motor');
  expect(errors).toEqual([]);
});

test('carousel controls and coloured product icons fit the viewport', async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: isMobile ? 320 : 1440, height: 900 });
  await page.goto('/');
  const region = carousel(page);
  await region.scrollIntoViewIfNeeded();
  await expect(region.getByRole('button', { name: /^عرض تأمين|^عرض التأمين/ })).toHaveCount(10);
  await region.getByRole('button', { name: 'عرض التأمين الطبي للشركات والمنشآت', exact: true }).click();
  await expect(region).toHaveAttribute('data-active-slide', 'business-health');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  const controls = await region.getByRole('button').evaluateAll(buttons => buttons.map(button => {
    const rect = button.getBoundingClientRect();
    return { width: rect.width, height: rect.height, left: rect.left, right: rect.right };
  }));
  for (const control of controls) {
    expect(control.width).toBeGreaterThanOrEqual(24);
    expect(control.height).toBeGreaterThanOrEqual(24);
    expect(control.left).toBeGreaterThanOrEqual(-1);
    expect(control.right).toBeLessThanOrEqual(isMobile ? 321 : 1441);
  }
  const products = page.getByRole('group', { name: 'منتجات التأمين', exact: true }).getByRole('button');
  await expect(products).toHaveCount(10);
  const colours = await products.evaluateAll(buttons => buttons.map(button => getComputedStyle(button.querySelector('svg')).color));
  expect(new Set(colours).size).toBeGreaterThanOrEqual(5);
});
