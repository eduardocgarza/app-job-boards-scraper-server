import { Page } from "puppeteer";
import updateCompanyRecord from "./updateCompanyRecord";
import updatePostingRecord from "./updatePostingRecord";
import { IRawCompanyDetailsInput } from "@/types/appInterfaces";

async function getJobDescriptionText(page: Page) {
  const jobDescriptionElement = await page.$("#JobDescriptionContainer .desc");
  if (!jobDescriptionElement) {
    console.error("Job description element not found");
    return "";
  }

  const jobDescription = await page.evaluate(
    (element) => element.textContent,
    jobDescriptionElement,
  );
  return jobDescription?.trim() ?? "";
}

function getCompanyUsername(companyUrl: string) {
  const startIndex = companyUrl.indexOf("at-") + 3;
  const endIndex = companyUrl.indexOf("-EI");
  return companyUrl.slice(startIndex, endIndex);
}

async function getCompanyURL(page: Page): Promise<string> {
  return await page.evaluate(() => {
    const scripts = Array.from(
      document.querySelectorAll("script[type='application/ld+json']"),
    ) as HTMLScriptElement[];
    let sameAs = "";

    for (const script of scripts) {
      try {
        const json = JSON.parse(script.textContent || "");
        if (
          json["@type"] === "JobPosting" &&
          json.hiringOrganization &&
          json.hiringOrganization.sameAs
        ) {
          sameAs = json.hiringOrganization.sameAs;
          break;
        }
      } catch (err) {
        console.error("Error parsing JSON-LD:", err);
      }
    }

    return sameAs;
  });
}

async function getCompanyData(page: Page): Promise<IRawCompanyDetailsInput> {
  const companyProfileURL = await getCompanyURL(page);
  const companyUsername = getCompanyUsername(companyProfileURL);
  const companyName = companyUsername.replaceAll("-", " ");
  const locationElement = await page.$("[data-test='location']");
  const hqLocation = await page.evaluate(
    (el) => (el && el.textContent ? el.textContent.trim() : ""),
    locationElement,
  );
  return { companyName, companyProfileURL, companyUsername, hqLocation };
}

export default async function getSinglePostingDetails(
  page: Page,
  companyId: string,
  postingId: string,
) {
  const jobDescriptionText = await getJobDescriptionText(page);
  const rawCompanyDetails: IRawCompanyDetailsInput = await getCompanyData(page);
  const companyDetails = { ...rawCompanyDetails, companyId };
  await updatePostingRecord(postingId, jobDescriptionText);
  await updateCompanyRecord(companyDetails);
}
