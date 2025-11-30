import { test, expect } from '@playwright/test'

test('calculadora realiza 12 + 7 = 19', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '1' }).click()
  await page.getByRole('button', { name: '2' }).click()
  await page.getByRole('button', { name: '+' }).click()
  await page.getByRole('button', { name: '7' }).click()
  await page.getByRole('button', { name: '=' }).click()
  await expect(page.getByLabel('display')).toHaveText('19')
})

test('percentual converte 50% para 0.5', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '5' }).click()
  await page.getByRole('button', { name: '0' }).click()
  await page.getByRole('button', { name: '%' }).click()
  await expect(page.getByLabel('display')).toHaveText('0.5')
})
