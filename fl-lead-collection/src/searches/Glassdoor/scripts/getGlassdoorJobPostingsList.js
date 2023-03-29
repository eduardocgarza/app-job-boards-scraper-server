import PuppBrowser from "../../../helpers/PuppBrowser.js";
import { GLASSDOOR_JOBS_COMPANY_SIZES, GLASSDOOR_JOBS_DATE_POSTED, GLASSDOOR_JOBS_DISTANCE, GLASSDOOR_JOBS_EASY_APPLY, SEARCH_ROLES } from "./glassdoorConstants.js";
import { insertPostingsData } from "./glassdoorDb.js";

const GLASSDOOR_MAX_JOB_PAGES = 30
const GLASSDOOR_POSTS_PER_PAGE = 30

async function setInputValue(page, selector, value) {
  await page.waitForSelector(selector);
  await page.focus(selector);
  // Select the current input content
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  // Press backspace to delete the selected content
  await page.keyboard.press('Backspace');
  // Type the new value
  await page.keyboard.type(value);
}

async function initJobBrowserSearch(page, locationName, roleName) {
  const keywordSelector = ".universalSearch__UniversalSearchBarStyles__searchKeywordContainer input"
  const locationSelector = ".universalSearch__UniversalSearchBarStyles__searchInputContainer input"
  const searchButtonSelector = ".universalSearch__UniversalSearchBarStyles__searchButton"
  // Any URL used as base for generating the new URL
  const ANY_URL = "https://www.glassdoor.com/Job/vancouver-software-engineer-jobs-SRCH_IL.0,9_IC2278756_KO10,27.htm"
  await page.goto(ANY_URL, { waitUntil: "networkidle0" })
  try {
    await setInputValue(page, keywordSelector, roleName);
    await setInputValue(page, locationSelector, locationName);
    // Click the button and wait for the navigation to complete
    await Promise.all([
      await page.click(searchButtonSelector),
      await page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ])
    // Copy the URL after the page completes loading 
    const fullURL = page.url()
    // Extract the Base URL from the copied URL
    const startIndex = fullURL.indexOf('SRCH');
    const endIndex = fullURL.indexOf('.htm');
    // Extract the desired part of the URL
    return fullURL.substring(startIndex, endIndex);
  }
  catch (error) {
    console.log("@error -- @initJobBrowserSearch: ", error)
    return ""
  }
}

function createGlassdoorURL(searchCode, options) {
  const { locationName, roleName, companySize } = options
  const baseURL = "https://www.glassdoor.com/Job"
  const urlEncode = url => url.replaceAll(" ", "-").toLowerCase()
  const formattedLocationName = urlEncode(locationName)
  const formattedRoleName = urlEncode(roleName)
  const jobType = "fulltime"
  const sortBy = "date_desc"
  const datePosted = GLASSDOOR_JOBS_DATE_POSTED.THIRTY
  const distance = GLASSDOOR_JOBS_DISTANCE.HUNDRED
  const easyApplyState = GLASSDOOR_JOBS_EASY_APPLY.REGULAR
  const easyApply = easyApplyState ? `&applicationType=${easyApplyState}` : ""
  return `${baseURL}/${formattedLocationName}-${formattedRoleName}-jobs-${searchCode}.htm?jobType=${jobType}&fromAge=${datePosted}&radius=${distance}${easyApply}&employerSizes=${companySize}&sortBy=${sortBy}`
}

function getJobPostingId(url) {
  const myURL = new URL(url);
  const regex = /jobListingId=(\d+)/;
  const match = regex.exec(myURL.search);
  return match ? match[1] : "";
}

async function getJobPostPage(page) {
  const jobListings = [];
  let companyName,
      roleName,
      roleLocation,
      salaryRange,
      jobPostingURL,
      glassdoorJobPostingId,
      companyRating,
      easyApply,
      datePosted;

  const allJobs = await page.$$("[data-test='jobListing']");
  for (const element of allJobs) {
    companyName = (await element.$(".css-l2wjgv")) ? await element.$eval(".css-l2wjgv", el => el.textContent) : "";
    roleName = (await element.$(".css-1rd3saf")) ? await element.$eval(".css-1rd3saf", el => el.textContent) : "";
    roleLocation = (await element.$(".e1rrn5ka0")) ? await element.$eval(".e1rrn5ka0", el => el.textContent) : "";
    salaryRange = (await element.$(".css-1xe2xww")) ? await element.$eval(".css-1xe2xww", el => el.textContent.split("(")[0]) : "";
    jobPostingURL = (await element.$(".css-l2wjgv")) ? await element.$eval(".css-l2wjgv", el => el.href) : "";
    companyRating = (await element.$(".css-2lqh28")) ? await element.$eval(".css-2lqh28", el => el.textContent) : "";
    easyApply = (await element.$(".css-r3emcz")) ? await element.$eval(".css-r3emcz", el => el.textContent.includes("Easy Apply")) : false;
    datePosted = (await element.$("div[data-test='job-age']")) ? await element.$eval("div[data-test='job-age']", el => el.textContent) : "";
    glassdoorJobPostingId = getJobPostingId(jobPostingURL);

    jobListings.push({
      companyName,
      roleName,
      roleLocation,
      salaryRange,
      jobPostingURL,
      glassdoorJobPostingId,
      companyRating,
      easyApply,
      datePosted,
    });
  }
  return jobListings;
}

async function getJobsSearchSize(page) {
  var numJobs, numPages
  const selector = "h1[data-test='jobCount-H1title']";
  const exists = await page.evaluate((selector) => document.querySelector(selector) !== null, selector);
  if (exists) {
    const textContent = await page.evaluate((selector) => {
      return document.querySelector(selector).textContent;
    }, selector);
    numJobs = textContent ? textContent.split(" ")[0] : 0;
  }
  numPages = Math.min(Math.ceil(numJobs / GLASSDOOR_POSTS_PER_PAGE), GLASSDOOR_MAX_JOB_PAGES)
  return numPages
}

async function getSearchResults(searchId, page, numPages) {
  for (let index = 0; index < numPages; index++) {
    const pageNumber = index + 1
    const jobPostings = await getJobPostPage(page)

    
    
    
    console.log("-- BEFORE @insertPostingsData: ", searchId)
    await insertPostingsData(searchId, jobPostings)
    console.log("-- AFTER @insertPostingsData")
    








    if (index !== numPages - 1) {
      // If Modal, hide Modal first.
      if (index > 0) {
        const modalParentSelector = ".modal_main"
        const modalSelector = ".SVGInline.modal_closeIcon"
        try {
          await Promise.race([
            page.waitForSelector(modalParentSelector),
            page.waitForTimeout(5000)
          ]);
          await page.click(modalSelector);
          await page.waitForTimeout(1000);
        } catch (e) {}
      }
      await Promise.all([
        page.waitForSelector("button.nextButton"),
        page.click("button.nextButton"),
        page.waitForNavigation(),
      ])
    }
    console.log(`Completed Page ${pageNumber} of ${numPages}.`)
  }
  console.log("--------------------------------------------------")
}

function createJobSearches(locationName) {
  const searches = []
  for (const roleName of SEARCH_ROLES) {
    for (const companySize of GLASSDOOR_JOBS_COMPANY_SIZES) {
      searches.push({ locationName, roleName, companySize: companySize.value })
    }
  }
  return searches
}

async function execSingleSearch(searchId, options) {
  const { page, closeBrowser } = await PuppBrowser()
  const { locationName, roleName } = options
  const searchCode = await initJobBrowserSearch(page, locationName, roleName)
  const glassdoorURL = createGlassdoorURL(searchCode, options)
  await page.goto(glassdoorURL, { waitUntil: "networkidle0" })
  const numPages = await getJobsSearchSize(page)
  await getSearchResults(searchId, page, numPages)
  await closeBrowser()
}

export default async function getGlassdoorJobPostingsSearchList(searchObject) {
  const { searchId, locationName } = searchObject
  const searches = createJobSearches(locationName)
  for (const searchOptions of searches) {
    await execSingleSearch(searchId, searchOptions)
  }
}