import { Page } from "puppeteer";
import { INDEED_MAX_JOB_PAGES, INDEED_POSTS_PER_PAGE } from "./indeedConstants";

export default async function indeedGetJobsSearchSize(page: Page) {
  let numJobs = 0;
  const selector = ".jobsearch-JobCountAndSortPane-jobCount";
  const exists = (await page.$(selector)) !== null;
  if (exists) {
    const textContent = await page.$eval(selector, (el) => el.textContent);
    const numJobsString = textContent ? textContent.split(" ")[0] : "0";
    numJobs = isNaN(Number(numJobsString)) ? 0 : Number(numJobsString);
  }
  const numPages = Math.min(Math.ceil(numJobs / INDEED_POSTS_PER_PAGE), INDEED_MAX_JOB_PAGES);
  return numPages;
}
