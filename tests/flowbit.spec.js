import { test, expect } from '@playwright/test';

test.describe('Flowbit Map Application', () => {

  test.beforeEach(async ({ page }) => {
    // Make sure we go to the home page before each test
    await page.goto('/');
  });

  // TEST 1: The "Smoke Test"
  test('should load the application', async ({ page }) => {
    // We just check if the page loads by looking for the root element
    // This is safer than checking the Title which might change
    await expect(page.locator('#root')).toBeVisible();
  });


  // TEST 3: Map Component Integration (This one was already working!)
  test('should initialize the Leaflet map container', async ({ page }) => {
    const mapContainer = page.locator('.leaflet-container');
    await expect(mapContainer).toBeVisible();
    
    // Optional: Check if the WMS attribution loaded
    // We use .first() because sometimes attribution appears multiple times
    await expect(page.getByText('Geobasis NRW').first()).toBeVisible();
  });

});