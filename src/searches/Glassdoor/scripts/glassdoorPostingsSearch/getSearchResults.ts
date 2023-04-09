import { Page } from "puppeteer";
import getJobPostPage from "./getJobPostPage";
import { IRawJobPosting } from "@/types/appInterfaces";
import insertPostingsData from "./insertPostingData";

async function retryClick(page: Page, selector: string, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    console.log("Inside Retry: ", i);
    const initialUrl = page.url();
    await page.click(selector);
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (page.url() !== initialUrl) {
      return true;
    }
  }
  return false;
}

export default async function getSearchResults(searchId: string, page: Page, numPages: number) {
  for (let index = 0; index < numPages; index++) {
    if (index == 3) return;
    console.log("START %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    const pageNumber = index + 1;

    console.log(`@getSearchResults - Starting Loop ${index} of ${numPages}.`);
    console.log("@getSearchResults - Before: getJobPostPage");
    const jobPostings: IRawJobPosting[] = await getJobPostPage(page);
    console.log("@getSearchResults - After: getJobPostPage");

    console.log("@getSearchResults - Before: @insertPostingsData");
    await insertPostingsData(searchId, jobPostings, index);
    console.log("@getSearchResults - After: @insertPostingsData");

    if (index !== numPages - 1) {
      // If Modal, hide Modal first.
      if (index > 0) {
        const modalParentSelector = ".modal_main";
        const modalSelector = ".SVGInline.modal_closeIcon";
        try {
          console.log("@getSearchResults - Before: Wait for Modal");
          await Promise.race([
            page.waitForSelector(modalParentSelector),
            await new Promise((resolve) => setTimeout(resolve, 3000)),
          ]);
          console.log("@getSearchResults - After: Wait for Modal");

          console.log("@getSearchResults - Before: Click Modal");
          await page.click(modalSelector);
          console.log("@getSearchResults - After: Click Modal");

          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
          console.log(`No Modal on Page ${pageNumber} - ${e}.`);
        }
      }

      //  Previous Code
      console.log("@getSearchResults - Before: Click Next Button");
      await Promise.all([
        page.waitForSelector("button.nextButton"),
        page.click("button.nextButton"),
        page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      ]);
      console.log("@getSearchResults - After: Click Next Button");
      console.log("END %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

      // Try New Code
      // console.log("@getSearchResults - Before: Click Next Button");
      // await page.waitForSelector("button.nextButton");
      //
      // const clicked = await retryClick(page, "button.nextButton");
      // if (!clicked) {
      // console.log("@getSearchResults - Failed to click Next Button");
      // Handle failure case, e.g., break the loop or throw an error
      // } else {
      // await page.waitForNavigation();
      // console.log("@getSearchResults - After: Click Next Button");
      // }
    }
    console.log(`@getSearchResults - End Loop ${index} of ${numPages}.\n\n`);
  }
}
