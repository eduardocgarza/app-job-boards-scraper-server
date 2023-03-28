import puppeteer from "puppeteer"
import execGlassdoorCompanySearch from "./glassdoorCompanySearch.js"
import execGlassdoorJobPostingSearch from "./glassdoorJobsSearch.js"

export async function PuppBrowser() {
  var browser, page
  async function launchBrowser() {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    })
    page = await browser.newPage()
  }
  async function closeBrowser() {
    await browser.close()
  }
  await launchBrowser()
  return { closeBrowser, page }
}

export default async function execGlassdoorSearch(locationName) {
  await execGlassdoorJobPostingSearch(locationName)
  await execGlassdoorCompanySearch(locationName)
}
