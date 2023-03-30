import { Page } from "puppeteer";
import getJobPostPage from "./getJobPostPage";
import { IRawJobPosting } from "@/types/appInterfaces";
import insertPostingsData from "./insertPostingData";

export default async function getSearchResults(
  searchId: string,
  page: Page,
  numPages: number,
) {
  for (let index = 0; index < numPages; index++) {
    const pageNumber = index + 1;
    const jobPostings: IRawJobPosting[] = await getJobPostPage(page);
    await insertPostingsData(searchId, jobPostings);
    if (index !== numPages - 1) {
      // If Modal, hide Modal first.
      if (index > 0) {
        const modalParentSelector = ".modal_main";
        const modalSelector = ".SVGInline.modal_closeIcon";
        try {
          await Promise.race([
            page.waitForSelector(modalParentSelector),
            await new Promise((resolve) => setTimeout(resolve, 5000)),
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
        page.waitForNavigation(),
      ]);
    }
    console.log(`Completed Page ${pageNumber} of ${numPages}.`);
  }
}
