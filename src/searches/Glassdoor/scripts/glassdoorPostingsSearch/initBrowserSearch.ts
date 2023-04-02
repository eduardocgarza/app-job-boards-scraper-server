import { Page } from "puppeteer";

async function setInputValue(page: Page, selector: string, value: string) {
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.keyboard.down("Control");
  await page.keyboard.press("A");
  await page.keyboard.up("Control");
  await page.keyboard.press("Backspace");
  await page.keyboard.type(value);
}

export default async function initJobBrowserSearch(
  page: Page,
  locationName: string,
  roleName: string,
) {
  const keywordSelector =
    ".universalSearch__UniversalSearchBarStyles__searchKeywordContainer input";
  const locationSelector =
    ".universalSearch__UniversalSearchBarStyles__searchInputContainer input";
  const searchButtonSelector = ".universalSearch__UniversalSearchBarStyles__searchButton";
  // Any URL used as base for generating the new URL
  const ANY_URL =
    "https://www.glassdoor.com/Job/vancouver-software-engineer-jobs-SRCH_IL.0,9_IC2278756_KO10,27.htm";
  await page.goto(ANY_URL, { waitUntil: "networkidle0" });
  try {
    await setInputValue(page, keywordSelector, roleName);
    await setInputValue(page, locationSelector, locationName);
    // Click the button and wait for the navigation to complete
    await Promise.all([
      await page.click(searchButtonSelector),
      await page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    // Copy the URL after the page completes loading
    const fullURL = page.url();
    // Extract the Base URL from the copied URL
    const startIndex = fullURL.indexOf("SRCH");
    const endIndex = fullURL.indexOf(".htm");
    // Extract the desired part of the URL
    return fullURL.substring(startIndex, endIndex);
  } catch (error) {
    console.log("@error -- @initJobBrowserSearch: ", error);
    return "";
  }
}
