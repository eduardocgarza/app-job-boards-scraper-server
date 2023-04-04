import puppeteer, { Browser } from "puppeteer";

const VIEWPORT_WIDTH_PCT = 0.9;
const VIEWPORT_HEIGHT_PCT = 0.9;

export default async function PuppBrowser() {
  let browser: Browser;
  async function launchBrowser() {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.setViewport({
      height: 1920,
      width: 1080,
    });
    return page;
  }
  async function closeBrowser() {
    await browser.close();
  }
  const page = await launchBrowser();
  return { closeBrowser, page };
}
