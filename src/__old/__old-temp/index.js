const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const ObjectsToCsv = require("objects-to-csv");

let jobListings = [];

const GLASSDOOR_MAX_PAGES = 30;
const DEV_MODE = true;
const GLASSDOOR_NUM_PAGES = DEV_MODE ? 3 : GLASSDOOR_MAX_PAGES;
const HEADLESS_MODE = !DEV_MODE;

// Main();

function getURLs() {
  const { canadaCities, canadaProvinces, usaCities, usaStates } = searchQueryLists;
  for (let cityItem of canadaCities) {
    const {
      cityName,
      cityKeyword,
      provinceName,
      provinceKeyword
    } = cityItem;
    const createGlassdoorURL = initializeGlassdoorURL(cityKeyword, jobKeyboard);
  }
}

async function Main() {
  // For each JOB-KEYWORD:
  // For each CITY-KEYWORD / STATE-KEYWORD:
  // Get all 30 pages of job-postings (900 total)
  // Save all items to unique file

  // Remove all duplicates across all files by analyzeing the jobPostingId in the URL
  // @results in a set of unique job postings


  const { canadaCities, canadaProvinces, usaCities, usaStates } = searchQueryLists;

  const jobKeyboard = "software-engineer";

  for (let cityItem of canadaCities) {
    const {
      cityName,
      cityKeyword,
      provinceName,
      provinceKeyword
    } = cityItem;
    console.log(`:: Getting data for ${cityName}`);

    const createGlassdoorURL = initializeGlassdoorURL(cityKeyword, jobKeyboard);
    console.log("test url", createGlassdoorURL(1));

    // 1. With the URL, get all job postings for this search
    //  @createGlassdoorURL only requires a PAGE_NUM now
    const postings = await getAllPostingsForSearch(createGlassdoorURL);

    fs.writeFileSync(`./data/${cityKeyword}.json`, JSON.stringify(postings));

    console.log(`Completed ${cityName} - ${provinceName}`);
  }
}


// PART 2 --- GET COMPANY INFO


async function getCompanyInfo(jobPage) {
  console.log("Getting job page...", jobPage);

  const browser = await puppeteer.launch({
    headless: HEADLESS_MODE,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  console.log("New page created");

  await page.goto(jobPage, { waitUntil: "networkidle0" });
  console.log("Completed waiting for network idle");

  // Extract "Job" Description
  var jobDescription = "";
  if ((await page.$("#JobDescriptionContainer")) != null) {
    jobDescription = await page.$eval(
      "#JobDescriptionContainer",
      (el) => el.textContent
    );
  }

  if ((await page.$(".link.py-xsm.px-std")) == null) {
    console.log(">> Did not find button. Closing browser...");
    await browser.close();
    return {
      companyLink: "",
      headquarters: "",
      sector: "",
      companySize: "",
      industry: "",
      revenue: "",
      jobDescription,
    };
  }

  // Click on "Company"
  await page.click(".link.py-xsm.px-std");
  await page.waitForSelector("a.link");

  var companyLink, headquarters, sector, companySize, industry, revenue;

  companyLink = await page.$eval("a.link", (el) => el.href);

  async function getText(query) {
    if ((await page.$(query)) == null) return "";
    return page.$eval(query, (el) => el.textContent);
  }

  headquarters = await getText("#headquarters");
  sector = await getText("#primaryIndustry.sectorName");
  companySize = await getText("#size");
  industry = await getText("#primaryIndustry.industryName");
  revenue = await getText("#revenue");

  await browser.close();

  return {
    companyLink,
    headquarters,
    sector,
    companySize,
    industry,
    revenue,
    jobDescription,
  };
}


async function getGlassdoorData() {
  // 3. For each job post, get the company info
  let finalDataItems = [];
  console.log("Step 5: Starting... getCompanyInfo()");

  for (let i = 0; i < jobListings.length; i++) {
    const { companyName, jobLink: jobPage } = jobListings[i];
    // const url = createScrapeAPIURL(jobPage)
    const url = jobPage;

    console.log("Loop:: Getting companyInfo for: ", companyName);

    const companyInfo = await getCompanyInfo(url);
    finalDataItems.push({ ...jobListings[i], ...companyInfo });
  }

  console.log("::Completed getCompanyInfo()");

  fs.writeFileSync("./output.json", JSON.stringify(finalDataItems));
  console.log("::Completed getGlassdoorData()");
}

/**
 * @getGlassdoorData
 *
 * This function takes no @inputs
 * This function returns no @outputs
 * This function writes the output to a file called "output.json"
 *
 * A standard Glassdoor job posting URL is provided, where the
 *  search is targeted based on (1) location and (2) job title.
 * Glassdoor returns 30 items (job posts) per page and a maximum of 30 pages.
 *
 * Other Search Settings:
 * - Sort by: Date Posted
 * - Job Type: Full Time
 * - Radius: 100 miles
 * - Dated Posted: Last Month (returns 1,300 items, capped at 900)
 *
 * Workflow:
 * 1. Get jobs, page by page until complete
 * 2. Save jobs to "glassdoorJobs.json"
 * 3. For each job post, get the company info
 *
 */


