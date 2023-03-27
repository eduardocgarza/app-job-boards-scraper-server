const fs = require("fs")
const axios = require("axios")
const puppeteer = require("puppeteer");
const express = require("express")
const cheerio = require("cheerio")

const app = express()

const DEV_MODE = true
const DEV_SEARCH_CODE_SHORT = "SRCH_IL.0,9_IC2278756_KO10,28"
const DEV_SEARCH_CODE_LONG = "SRCH_IL.0,9_IC2278756_KO10,27"
const DEV_SEARCH_CODE = DEV_SEARCH_CODE_LONG

const GLASSDOOR_POSTS_PER_PAGE = 30
const GLASSDOOR_MAX_JOB_PAGES = 30
const DEV_JOB_PAGES = 5
const JOBS_PAGES = DEV_MODE ? DEV_JOB_PAGES : GLASSDOOR_MAX_JOB_PAGES

// Any URL used as base for generating the new URL
const ANY_URL_SHORT = "https://www.glassdoor.com/Job/vancouver-software-developer-jobs-SRCH_IL.0,9_IC2278756_KO10,28.htm"
const ANY_URL_LONG = "https://www.glassdoor.com/Job/vancouver-software-engineer-jobs-SRCH_IL.0,9_IC2278756_KO10,27.htm"
const ANY_URL = ANY_URL_LONG

async function launchBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  })
  return { browser, page: await browser.newPage() }
}

async function closeBrowser(browser) {
  return await browser.close()
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

const keywordSelector = ".universalSearch__UniversalSearchBarStyles__searchKeywordContainer input"
const locationSelector = ".universalSearch__UniversalSearchBarStyles__searchInputContainer input"
const searchButtonSelector = ".universalSearch__UniversalSearchBarStyles__searchButton"

async function getSearchURLCode() {
  if (DEV_MODE) return DEV_SEARCH_CODE

  const { browser, page } = await launchBrowser()
  await page.goto(ANY_URL, { waitUntil: "networkidle0" })

  const roleName = "Software Engineer"
  const locationName = "Calgary, AB"

  try {
    await setInputValue(page, keywordSelector, roleName),
      await setInputValue(page, locationSelector, locationName)

    await Promise.all([
      // Click the search button and go to new page
      await page.click(searchButtonSelector),
      // Click the button and wait for the navigation to complete
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
    console.log("Error: ", error)
  }
}

const fullURL = "https://www.glassdoor.com/Job/vancouver-software-developer-jobs-SRCH_IL.0,9_IC2278756_KO10,28.htm"
const baseURL = "https://www.glassdoor.com/Job"

function urlEncode(url) {
  return url.replaceAll(" ", "-").toLowerCase()
}

function devCreateURLGenerator(searchCode) {
  return function (pageNumber) {
    return `https://www.glassdoor.com/Job/vancouver-front-end-engineer-jobs-${searchCode}_IP${pageNumber}.htm`
  }
}

function createURLGenerator(searchCode) {
  if (DEV_MODE) return devCreateURLGenerator(searchCode)

  const locationName = "Vancouver".toLowerCase()
  const roleName = "Front End Engineer"

  const formattedLocationName = urlEncode(locationName)
  const formattedRoleName = urlEncode(roleName)
  const jobType = "fulltime"
  const datePosted = { three: 3, seven: 7, fourteen: 14, thirty: 30 }.thirty
  const distance = { five: 5, ten: 10, fifteeth: 15, twentyFive: 25, fifty: 50, hundred: 100 }.hundred
  const easyApply = { true: 1, false: 0 }.true
  const companySize = { less200: 1, less500: 2, less5000: 3, more5000: 4 }.less200
  const sortBy = { date: "date_desc" }.date

  return function (pageNumber) {
    return `${baseURL}/${formattedLocationName}-${formattedRoleName}-jobs-${searchCode}_IP=${pageNumber}.htm?jobType=${jobType}&fromAge=${datePosted}&radius=${distance}&applicationType=${easyApply}&employerSizes=${companySize}&sortBy=${sortBy}`
  }
}

const SCRAPE_API_KEY = "4a6514ca562591433a23ffc4b284cc83";
const SCRAPE_BASE_URL = `http://api.scraperapi.com?api_key=${SCRAPE_API_KEY}&url=`;

function createScraperURL(url) {
  return SCRAPE_BASE_URL + url
}

async function getJobPostPage(page) {
  const jobListings = [];
  let companyName,
    roleName,
    roleLocation,
    salaryRange,
    jobPostingURL,
    companyRating,
    easyApply,
    datePosted;
  const allJobs = await page.$$("[data-test='jobListing']");

  for (const element of allJobs) {
    companyName = (await element.$(".css-l2wjgv")) ? await element.$eval(".css-l2wjgv", el => el.textContent) : "";
    roleName = (await element.$(".css-1rd3saf")) ? await element.$eval(".css-1rd3saf", el => el.textContent) : "";
    roleLocation = (await element.$(".e1rrn5ka0")) ? await element.$eval(".e1rrn5ka0", el => el.textContent) : "";
    salaryRange = (await element.$(".css-1xe2xww")) ? await element.$eval(".css-1xe2xww", el => el.textContent.split("(")[0]) : "";
    jobPostingURL = (await element.$(".css-l2wjgv")) ? await element.$eval(".css-l2wjgv", el => `https://glassdoor.com${el.href}`) : "";
    companyRating = (await element.$(".css-2lqh28")) ? await element.$eval(".css-2lqh28", el => el.textContent) : "";
    easyApply = (await element.$(".css-r3emcz")) ? await element.$eval(".css-r3emcz", el => el.textContent.includes("Easy Apply")) : false;
    datePosted = (await element.$("div[data-test='job-age']")) ? await element.$eval("div[data-test='job-age']", el => el.textContent) : "";

    jobListings.push({
      companyName,
      roleName,
      roleLocation,
      salaryRange,
      jobPostingURL,
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

async function getSearchSize(createURL) {
  const url = createScraperURL(createURL(1))
  const page = await axios(url);
  const html = await page.data;
  const $ = cheerio.load(html);
  var numJobs = $("h1[data-test='jobCount-H1title']").text();
  numJobs = numJobs ? numJobs.split(" ")[0] : 0
  const numPages = Math.ceil(numJobs / GLASSDOOR_POSTS_PER_PAGE)
  return { numPages, numJobs };
}

async function getSearchResults(createURL) {
  const jobPostings = []
  const { browser, page } = await launchBrowser()

  // 1. Get the @numPages and @numJobs
  const { numPages, numJobs } = await getSearchSize(createURL)
  console.log(`Found ${numJobs} jobs in ${numPages} pages...`)

  // 2. Loop through each page and get the job postings
  var nextPageURL
  for (let index = 0; index < numPages; index++) {
    const pageNumber = index + 1
    const glassdoorURL = (index === 0) ? createURL(pageNumber) : nextPageURL
    await page.goto(glassdoorURL, { waitUntil: "networkidle0" })

    const pageJobPostings = await getJobPostPage(page)
    jobPostings.push(...pageJobPostings)
    console.log(`Completed Page ${pageNumber} of ${numPages}...`)

    if (index !== numPages - 1) {
      await Promise.all([
        await page.waitForSelector("button.nextButton"),
        await page.click("button.nextButton"),
        await page.waitForNavigation()
      ])
      nextPageURL = page.url()
    }
  }
  closeBrowser(browser)
  return jobPostings
}

async function Main() {
  console.log(":: Main() Start")

  // Step 1 - Get the search code
  const searchCode = await getSearchURLCode()
  console.log("Step 1: Search Code: ", searchCode, "\n")

  // Step 2 - Create the URL Generator, to generate each page URL
  const createURL = createURLGenerator(searchCode)
  console.log("Step 2: URL Generator Created: ", createURL(1), "\n")

  // Step 3 - Call the page and get the page data (30 results/pg x 30 pgs)
  const jobPostings = await getSearchResults(createURL)
  console.log("Step 3: Job Postings: ", jobPostings, "\n")
  console.log("Step 3: Job Postings Length: ", jobPostings.length, "\n")
  fs.writeFileSync("./jobPostings.json", JSON.stringify(jobPostings))
  console.log("Step 3: Job Postings Saved to File: \n")
  // ...

  console.log(":: Main() End")
}

Main()

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})