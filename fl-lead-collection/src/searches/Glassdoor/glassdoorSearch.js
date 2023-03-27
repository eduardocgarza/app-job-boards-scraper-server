import fs from "fs"
import axios from "axios"
import puppeteer from "puppeteer"
import express from "express"
import cheerio from "cheerio"
import { JOBS_COMPANY_SIZES, JOBS_DATE_POSTED, JOBS_DISTANCE, JOBS_EASY_APPLY, LOCATIONS, ROLES } from "./glassdoorConstants.js"
import { URL } from "url"

const DEV_MODE = false
const DEV_SEARCH_CODE_SHORT = "SRCH_IL.0,9_IC2278756_KO10,28"
const DEV_SEARCH_CODE_LONG = "SRCH_IL.0,9_IC2278756_KO10,27"
const DEV_SEARCH_CODE = DEV_SEARCH_CODE_LONG

const {SCRAPE_API_KEY} = process.env

const GLASSDOOR_POSTS_PER_PAGE = 30
const GLASSDOOR_MAX_JOB_PAGES = 30
const DEV_JOB_PAGES = 5
const JOBS_PAGES = DEV_MODE ? DEV_JOB_PAGES : GLASSDOOR_MAX_JOB_PAGES

async function Browser() {
  var browser, page

  async function launchBrowser() {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    })
    page = await browser.newPage()
  }

  async function closeBrowser() {
    await browser.close()
  }

  await launchBrowser()
  
  return { closeBrowser, page }
}

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
  if (DEV_MODE) return DEV_SEARCH_CODE

  const keywordSelector = ".universalSearch__UniversalSearchBarStyles__searchKeywordContainer input"
  const locationSelector = ".universalSearch__UniversalSearchBarStyles__searchInputContainer input"
  const searchButtonSelector = ".universalSearch__UniversalSearchBarStyles__searchButton"

  // Any URL used as base for generating the new URL
  const ANY_URL_SHORT = "https://www.glassdoor.com/Job/vancouver-software-developer-jobs-SRCH_IL.0,9_IC2278756_KO10,28.htm"
  const ANY_URL_LONG = "https://www.glassdoor.com/Job/vancouver-software-engineer-jobs-SRCH_IL.0,9_IC2278756_KO10,27.htm"
  const ANY_URL = DEV_MODE ? ANY_URL_SHORT : ANY_URL_LONG

  await page.goto(ANY_URL, { waitUntil: "networkidle0" })

  try {
    await setInputValue(page, keywordSelector, roleName),
    await setInputValue(page, locationSelector, locationName)

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
  const datePosted = JOBS_DATE_POSTED.THIRTY
  const distance = JOBS_DISTANCE.HUNDRED
  const easyApplyState = JOBS_EASY_APPLY.REGULAR
  const easyApply = easyApplyState ? `&applicationType=${easyApplyState}` : ""
  
  return `${baseURL}/${formattedLocationName}-${formattedRoleName}-jobs-${searchCode}.htm?jobType=${jobType}&fromAge=${datePosted}&radius=${distance}${easyApply}&employerSizes=${companySize}&sortBy=${sortBy}`
}

function createScraperURL(url) {
  const SCRAPE_BASE_URL = `http://api.scraperapi.com?api_key=${SCRAPE_API_KEY}&url=`;
  return SCRAPE_BASE_URL + url
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
    jobPostingId,
    companyRating,
    easyApply,
    datePosted;
  const allJobs = await page.$$("[data-test='jobListing']");
  for(const element of allJobs) {
    companyName = (await element.$(".css-l2wjgv")) ? await element.$eval(".css-l2wjgv", el => el.textContent) : "";
    roleName = (await element.$(".css-1rd3saf")) ? await element.$eval(".css-1rd3saf", el => el.textContent) : "";
    roleLocation = (await element.$(".e1rrn5ka0")) ? await element.$eval(".e1rrn5ka0", el => el.textContent) : "";
    salaryRange = (await element.$(".css-1xe2xww")) ? await element.$eval(".css-1xe2xww", el => el.textContent.split("(")[0]) : "";
    jobPostingURL = (await element.$(".css-l2wjgv")) ? await element.$eval(".css-l2wjgv", el => `https://glassdoor.com${el.href}`) : "";
    jobPostingId = getJobPostingId(jobPostingURL);
    companyRating = (await element.$(".css-2lqh28")) ? await element.$eval(".css-2lqh28", el => el.textContent) : "";
    easyApply = (await element.$(".css-r3emcz")) ? await element.$eval(".css-r3emcz", el => el.textContent.includes("Easy Apply")) : false;
    datePosted = (await element.$("div[data-test='job-age']")) ? await element.$eval("div[data-test='job-age']", el => el.textContent) : "";

    jobListings.push({
      companyName,
      roleName,
      roleLocation,
      salaryRange,
      jobPostingURL,
      jobPostingId,
      companyRating,
      easyApply,
      datePosted,
    });
  }
  return jobListings;
}

async function getJobPostPageAlt(url) {
  const jobListings = []
  var companyName,
    roleName,
    location,
    salaryRange,
    jobPostingURL,
    companyRating,
    easyApply,
    datePosted

  const page = await axios(url);
  const html = await page.data;
  console.log("Step 2: Received jobs from Axios. \n");

  const $ = cheerio.load(html);
  const allJobs = $("[data-test='jobListing']");

  console.log("Step 3: Starting Loop. \n");
  allJobs.each((_, element) => {
    companyName = $(element).find(".css-l2wjgv").text();
    roleName = $(element).find(".css-1rd3saf").text();

    location = $(element).find(".e1rrn5ka0").text();
    salaryRange = $(element).find(".css-1xe2xww").text();
    salaryRange = salaryRange.split("(")[0];

    jobPostingURL = $(element).find(".css-l2wjgv").attr("href");
    jobPostingURL = `https://glassdoor.com${jobPostingURL}`;

    companyRating = $(element).find(".css-2lqh28").text();
    easyApply = $(element).find(".css-r3emcz").text();
    easyApply = easyApply.includes("Easy Apply");

    datePosted = $(element).find("div[data-test='job-age']").text();

    jobListings.push({
      companyName,
      roleName,
      location,
      salaryRange,
      jobPostingURL,
      companyRating,
      easyApply,
      datePosted,
    });
  });
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
  numPages = Math.ceil(numJobs / GLASSDOOR_POSTS_PER_PAGE)
  return { numPages, numJobs }
}

async function getSearchResults(page, numPages) {
  var jobPostings = []
  for (let index = 0; index < numPages; index++) {
    const pageNumber = index + 1
    const pageJobPostings = await getJobPostPage(page)
    console.log(`Completed @getJobPostPage - Page: ${pageNumber}`)

    jobPostings.push(...pageJobPostings)
    if (index !== numPages - 1) {
      // If Modal, hide Modal first.
      if(index > 0) {
        const modalParentSelector = ".modal_main"
        const modalSelector = ".SVGInline.modal_closeIcon"
        console.log("Waiting for Modal")
        await page.waitForSelector(modalParentSelector)
        console.log("Modal Found \n")
        
        await page.click(modalSelector),
        console.log("Modal clicked.")
        
        await page.waitForTimeout(500),
        console.log("Modal Closed.")
      }
      console.log("Ready to click button")
      await Promise.all([
        () => { console.log("Promise Started")},
        page.waitForSelector("button.nextButton"),
        () => { console.log("WaitForSelector on Button Success" )},
        page.click("button.nextButton"),
        () => { console.log("Clicked button" )},
        page.waitForNavigation(),
      ])
      console.log("Clicked button")
    }
    console.log(`Completed Page ${pageNumber} of ${numPages}.`)
  }
  return jobPostings
}

function createJobSearches(locationName) {
  const searches = []
  for(const roleName of ROLES) {
    for(const companySize of JOBS_COMPANY_SIZES) {
      searches.push({ locationName, roleName, companySize: companySize.value })
    }
  }
  
  return searches
}

async function execSingleSearch(options) {
  const { page, closeBrowser } = await Browser()
  const { locationName, roleName } = options
  const searchCode = await initJobBrowserSearch(page, locationName, roleName)
  const glassdoorURL = createGlassdoorURL(searchCode, options)

  await page.goto(glassdoorURL, { waitUntil: "networkidle0" })
  const { numPages, numJobs } = await getJobsSearchSize(page)
  const jobPostings = await getSearchResults(page, numPages)
  fs.writeFileSync("./jobPostings.json", JSON.stringify(jobPostings))
  return
}

async function jobSearch(locationName) {
  const searches = createJobSearches(locationName)
  for(const search of searches) {
    const options = { ...search }
    await execSingleSearch(options)
    console.log("::Main - Completed Search")
    break
  }
}

async function createCompanySearches() {
  return []
}

async function companySearch(locationName) {
  const searches = createCompanySearches(locationName)
}

export default async function execGlassdoorSearch(locationName) {
  await jobSearch(locationName)
  await companySearch()
}
