import puppeteer, { Browser } from "puppeteer";

export default async function PuppBrowser() {
  let browser: Browser;
  async function launchBrowser() {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    return page;
  }
  async function closeBrowser() {
    await browser.close();
  }
  const page = await launchBrowser();
  return { closeBrowser, page };
}
