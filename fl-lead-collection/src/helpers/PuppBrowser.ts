import puppeteer, { Browser, Page } from "puppeteer";

export default async function PuppBrowser() {
  let browser: Browser;
  async function launchBrowser() {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    return await browser.newPage();
  }
  async function closeBrowser() {
    await browser.close();
  }
  const page = await launchBrowser();
  return { closeBrowser, page };
}
