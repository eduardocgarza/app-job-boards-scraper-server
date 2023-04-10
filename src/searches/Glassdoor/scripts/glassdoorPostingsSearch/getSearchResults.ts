import { Page } from "puppeteer";
import getJobPostPage from "./getJobPostPage";
import { IRawJobPosting } from "@/types/appInterfaces";
import insertPostingsData from "./insertPostingData";

const MODAL_WAIT_TIME = 3000;

async function handleNextPage(page: Page, index: number, numPages: number) {
  if (index !== numPages - 1) {
    const pageNumber = index + 1;
    // If Modal, hide Modal first.
    if (index > 0) {
      const modalParentSelector = ".modal_main";
      const modalSelector = ".SVGInline.modal_closeIcon";
      try {
        await Promise.race([
          page.waitForSelector(modalParentSelector),
          await new Promise((resolve) => setTimeout(resolve, MODAL_WAIT_TIME)),
        ]);
        await page.click(modalSelector);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.log(`No Modal on Page ${pageNumber} - ${e}.`);
      }
    }

    await Promise.all([
      page.waitForSelector("button.nextButton"),
      page.click("button.nextButton"),
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    ]);
  }
}

export default async function getSearchResults(searchId: string, page: Page, numPages: number) {
  for (let index = 0; index < numPages; index++) {
    const jobPostings: IRawJobPosting[] = await getJobPostPage(page);
    console.log(`@getSearchResults - Start Loop ${index} of ${numPages}:`);
    await insertPostingsData(searchId, jobPostings);
    await handleNextPage(page, index, numPages);
    console.log(`@getSearchResults - End Loop ${index} of ${numPages}.\n\n`);
  }
}
