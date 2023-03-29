import puppeteer from "puppeteer";

export default async function PuppBrowser() {
  var browser, page;
  async function launchBrowser() {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    page = await browser.newPage();
  }
  async function closeBrowser() {
    await browser.close();
  }
  await launchBrowser();
  return { closeBrowser, page };
}