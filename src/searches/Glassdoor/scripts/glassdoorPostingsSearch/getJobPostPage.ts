import { convertGlassdoorDate } from "@/helpers/convertGlassdoorDate";
import { IRawJobPosting } from "@/types/appInterfaces";
import { Page } from "puppeteer";

function getJobPostingId(url: string) {
  const myURL = new URL(url);
  const regex = /jobListingId=(\d+)/;
  const match = regex.exec(myURL.search);
  return match ? match[1] : "";
}

export default async function getJobPostPage(page: Page): Promise<IRawJobPosting[]> {
  const jobListings: IRawJobPosting[] = [];
  let teamName, roleName, roleLocation, salaryRange, postingURL, platformPostingId, companyRating, easyApply, datePosted;

  const allJobs = await page.$$("[data-test='jobListing']");
  for (const element of allJobs) {
    teamName = (await element.$(".css-l2wjgv")) ? await element.$eval(".css-l2wjgv", (el) => el.textContent || "") : "";
    roleName = (await element.$(".css-1rd3saf")) ? await element.$eval(".css-1rd3saf", (el) => el.textContent || "") : "";
    roleLocation = (await element.$(".e1rrn5ka0")) ? await element.$eval(".e1rrn5ka0", (el) => el.textContent || "") : "";
    salaryRange = (await element.$(".css-1xe2xww"))
      ? await element.$eval(".css-1xe2xww", (el) => ((el.textContent ? el.textContent.split("(")[0] : "") || "").trim())
      : "";
    postingURL = (await element.$(".jobLink"))
      ? await element.$eval(".jobLink", (el: Element) => {
          const anchorElement = el as HTMLAnchorElement;
          return anchorElement.href;
        })
      : "";

    companyRating = (await element.$(".css-2lqh28")) ? await element.$eval(".css-2lqh28", (el) => el.textContent || "") : "";
    easyApply = (await element.$(".css-r3emcz"))
      ? await element.$eval(".css-r3emcz", (el) => (el.textContent ? el.textContent.includes("Easy Apply") : false))
      : false;
    datePosted = (await element.$("div[data-test='job-age']"))
      ? await element.$eval("div[data-test='job-age']", (el) => el.textContent || "")
      : "";
    datePosted = convertGlassdoorDate(datePosted);
    platformPostingId = getJobPostingId(postingURL);

    jobListings.push({
      teamName,
      roleName,
      roleLocation,
      salaryRange,
      postingURL,
      platformPostingId,
      companyRating,
      easyApply,
      datePosted,
    });
  }
  return jobListings;
}
