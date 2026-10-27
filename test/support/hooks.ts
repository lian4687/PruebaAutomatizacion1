import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium } from '@playwright/test';
import { pageFixture } from './pageFixture';

let browser: Browser;
let context: BrowserContext;


BeforeAll(async function () {
  setDefaultTimeout(60 * 1000); 
  browser = await chromium.launch({ headless: false });;
});


Before(async function () {
  context = await browser.newContext();
  pageFixture.page = await context.newPage();
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && pageFixture.page) {
    const screenshot = await pageFixture.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await pageFixture.page?.close();
  await context?.close();
});

AfterAll(async function () {
 await browser?.close();
});