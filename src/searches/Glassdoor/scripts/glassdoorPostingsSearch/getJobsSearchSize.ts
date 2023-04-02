import { Page } from "puppeteer";
import {
  GLASSDOOR_MAX_JOB_PAGES,
  GLASSDOOR_POSTS_PER_PAGE,
} from "../../glassdoorConstants";

export default async function getJobsSearchSize(page: Page) {
  let numJobs = 0;
  const selector = "h1[data-test='jobCount-H1title']";
  const exists = (await page.$(selector)) !== null;
  if (exists) {
    const textContent = await page.$eval(selector, (el) => el.textContent);
    const numJobsString = textContent ? textContent.split(" ")[0] : "0";
    numJobs = isNaN(Number(numJobsString)) ? 0 : Number(numJobsString);
  }
  const numPages = Math.min(
    Math.ceil(numJobs / GLASSDOOR_POSTS_PER_PAGE),
    GLASSDOOR_MAX_JOB_PAGES,
  );
  return numPages;
}
