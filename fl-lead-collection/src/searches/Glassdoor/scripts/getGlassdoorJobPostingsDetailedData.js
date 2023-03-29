import { pool } from "../../../db/dbConfig.js";
import PuppBrowser from "../../../helpers/PuppBrowser.js";
import { glassdoorDBGetJobPostings } from "./glassdoorDb.js";

function getCompanyUsername(companyUrl) {
  const startIndex = companyUrl.indexOf('at-') + 3;
  const endIndex = companyUrl.indexOf('-EI');
  return companyUrl.slice(startIndex, endIndex);
}

async function getJobDescriptionText(page) {
  const jobDescriptionElement = await page.$('#JobDescriptionContainer .desc');
  const jobDescription = await page.evaluate(element => element.textContent, jobDescriptionElement);
  return jobDescription.trim();
}

async function getCompanyData(page) {
  const companyProfileURLElement = await page.$('a[data-test="employerLogo"]');
  const companyProfileURL = await page.evaluate((element) => element.href, companyProfileURLElement);
  const companyUsername = getCompanyUsername(companyProfileURL);
  const locationElement = await page.$('[data-test="location"]');
  const hqLocation = await page.evaluate(element => element.textContent.trim(), locationElement);
  return { companyProfileURL, companyUsername, hqLocation };
}

async function updateJobPostingRecord(jobPostingId, jobDescriptionText) {
  await pool.query(
    `
      UPDATE job_postings
      SET job_description = $1, verified = true
      WHERE posting_id = $2
    `,
    [jobDescriptionText, jobPostingId]
  );
}

async function updateCompanyRecord(companyId, companyProfileURL, companyUsername, hqLocation) {
  const query = `
    UPDATE companies 
    SET company_profile_url = $1, 
        company_username = $2, 
        headquarters_location = $3 
    WHERE company_id = $4
  `;
  await pool.query(query, [companyProfileURL, companyUsername, hqLocation, companyId]);
}

async function getSinglePostingDetails(companyId, jobPostingId, page) {
  const jobDescriptionText = await getJobDescriptionText(page)
  const {
    companyProfileURL,
    companyUsername,
    hqLocation
  } = await getCompanyData(page)
  await updateJobPostingRecord(jobPostingId, jobDescriptionText);
  await updateCompanyRecord(companyId, companyProfileURL, companyUsername, hqLocation)
}

export default async function getGlassdoorJobPostingsDetailedData(searchObject) {
  console.log("Starting @getGlassdoorJobPostingsDetailedData()")
  const { searchId } = searchObject;
  const jobPostings = await glassdoorDBGetJobPostings(searchId)
  const { page, closeBrowser } = await PuppBrowser()
  for (const jobPosting of jobPostings) {
    console.log("jobPosting: ", jobPosting)
    const {
      company_id: companyId,
      posting_id: jobPostingId,
      posting_url: jobPostingURL
    } = jobPosting
    await page.goto(jobPostingURL, { waitUntil: "networkidle0" })
    await getSinglePostingDetails(companyId, jobPostingId, page)
  }
  console.log("Finished @getGlassdoorJobPostingsDetailedData()")
  await closeBrowser()
}