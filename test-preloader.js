const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Launching browser to test KANTES preloader...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('📍 Navigating to http://localhost:3000');

  // Navigate to localhost:3000
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle2',
    timeout: 10000
  });

  console.log('✅ Page loaded successfully');

  // Wait a bit to see the preloader animation
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Take screenshot
  const screenshotPath = './kantes-preloader-test.png';
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`📸 Screenshot saved to: ${screenshotPath}`);

  // Get page title
  const title = await page.title();
  console.log(`📄 Page title: ${title}`);

  // Check for KANTES elements
  const kantesLogo = await page.$('.logo-container');
  const tagline = await page.$('.tagline');
  const pulsingLine = await page.$('.pulse-line');
  const gridBackground = await page.$('.grid-lines');

  console.log('\n🔍 Element Check:');
  console.log(`  - Logo container: ${kantesLogo ? '✅ Found' : '❌ Missing'}`);
  console.log(`  - Tagline: ${tagline ? '✅ Found' : '❌ Missing'}`);
  console.log(`  - Pulsing line: ${pulsingLine ? '✅ Found' : '❌ Missing'}`);
  console.log(`  - Grid background: ${gridBackground ? '✅ Found' : '❌ Missing'}`);

  // Get console logs
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  // Check for errors
  page.on('pageerror', error => {
    console.log('❌ PAGE ERROR:', error.message);
  });

  // Wait for preloader animation (2.8 seconds total)
  console.log('\n⏳ Waiting for preloader animation (2.8s)...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Take screenshot after animation
  const screenshotAfterPath = './kantes-after-preloader.png';
  await page.screenshot({ path: screenshotAfterPath, fullPage: false });
  console.log(`📸 Screenshot after animation saved to: ${screenshotAfterPath}`);

  await browser.close();
  console.log('\n✅ Test complete!');
})().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
