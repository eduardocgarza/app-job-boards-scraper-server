import { Page } from "puppeteer";
import { IIndeedRawJobPosting } from "./indeedInterfaces";

function getJobPostingId(jobUrl: string) {
  if (jobUrl.includes("indeed.com/company")) {
    let updatedURL = jobUrl;
    const indexQuestionMark = jobUrl.indexOf("?");
    updatedURL = jobUrl.substring(0, indexQuestionMark);
    const indexLastSlash = updatedURL.lastIndexOf("-");
    return updatedURL.substring(indexLastSlash + 1);
  } else {
    const regex = /(?:\?|&)jk=([^&]+)/;
    const match = jobUrl.match(regex);
    return match ? match[1] : "";
  }
}

export default async function indeedGetPageResults(page: Page) {
  const jobListings: IIndeedRawJobPosting[] = [];

  const roleNameSelector = ".jcs-JobTitle";
  const companyNameSelector = ".companyName";
  const roleLocationSelector = ".companyLocation";
  const datePostedSelector = ".date";
  const easyApplySelector = ".indeedApply";
  const postingURLSelector = ".jcs-JobTitle";
  const companyURLSelector = ".companyName a";

  const allJobs = await page.$$(".jobsearch-ResultsList > li");

  for (const element of allJobs) {
    const roleName = (await element.$(roleNameSelector))
      ? (await element.$eval(roleNameSelector, (el) => el.textContent || "")).trim()
      : "";
    const companyName = (await element.$(companyNameSelector))
      ? (await element.$eval(companyNameSelector, (el) => el.textContent || "")).trim()
      : "";
    const teamName = companyName;
    const roleLocation = (await element.$(roleLocationSelector))
      ? (await element.$eval(roleLocationSelector, (el) => el.textContent || "")).trim()
      : "";
    let datePosted = (await element.$(datePostedSelector))
      ? (await element.$eval(datePostedSelector, (el) => el.textContent || "")).trim()
      : "";
    datePosted = datePosted.replace("Posted", "");
    const easyApply = (await element.$(easyApplySelector)) ? (await element.$(easyApplySelector)) !== null : false;

    const postingURL = (await element.$(postingURLSelector))
      ? await element.$eval(postingURLSelector, (el: Element) => {
          const anchorElement = el as HTMLAnchorElement;
          return anchorElement.href;
        })
      : "";

    const companyURL = (await element.$(companyURLSelector))
      ? await element.$eval(companyURLSelector, (el: Element) => {
          const anchorElement = el as HTMLAnchorElement;
          return anchorElement.href;
        })
      : "";

    console.log("Before - @getJobPostingId: ", postingURL);
    const postingId = getJobPostingId(postingURL);
    console.log("After - @getJobPostingId");

    jobListings.push({ companyName, companyURL, teamName, postingId, postingURL, roleName, roleLocation, easyApply, datePosted });
  }
  console.log(jobListings);
  return jobListings;
}
