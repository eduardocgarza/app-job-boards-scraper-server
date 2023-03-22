const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const ObjectsToCsv = require("objects-to-csv");

let jobListings = [];

const SCRAPE_API_KEY = "4a6514ca562591433a23ffc4b284cc83";
const SCRAPE_BASE_URL = `http://api.scraperapi.com?api_key=${SCRAPE_API_KEY}&url=`;

const GLASSDOOR_MAX_PAGES = 30;
const DEV_MODE = true;
const GLASSDOOR_NUM_PAGES = DEV_MODE ? 3 : GLASSDOOR_MAX_PAGES;
const HEADLESS_MODE = !DEV_MODE;


function initializeGlassdoorURL(location, jobKeyword) {
  const searchQuery = "radius=100&jobType=fulltime&sortBy=date_desc";
  const baseURL = `https://www.glassdoor.com/Job/${location}-${jobKeyword}-jobs-SRCH_IL.0,9_IC2278756_KO10,18_IP`;

  return function (pageNum) {
    return `${baseURL}${pageNum}.htm?${searchQuery}`;
  };
}

function createScrapeAPIURL(url) {
  return SCRAPE_BASE_URL + url;
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
const searchQueryLists = {
  canadaCities: [
    {
      cityName: "Victoria",
      provinceName: "British Columbia",
      cityKeyword: "victoria",
      provinceKeyword: "british-columbia",
    },,
    {
      cityName: "Vancouver",
      provinceName: "British Columbia",
      cityKeyword: "vancouver",
      provinceKeyword: "british-columbia",
    },
    {
      cityName: "Calgary",
      provinceName: "Alberta",
      cityKeyword: "calgary",
      provinceKeyword: "alberta",
    },
    {
      cityName: "Edmonton",
      provinceName: "Alberta",
      cityKeyword: "edmonton",
      provinceKeyword: "alberta",
    },
    {
      cityName: "Winnipeg",
      provinceName: "Manitoba",
      cityKeyword: "winnipeg",
      provinceKeyword: "manitoba",
    },
    {
      cityName: "Toronto",
      provinceName: "Ontario",
      cityKeyword: "toronto",
      provinceKeyword: "ontario",
    },
    {
      cityName: "Ottawa",
      provinceName: "Ontario",
      cityKeyword: "ottawa",
      provinceKeyword: "ontario",
    },
    {
      cityName: "Montreal",
      provinceName: "Quebec",
      cityKeyword: "montreal",
      provinceKeyword: "quebec",
    },
    {
      cityName: "Quebec City",
      provinceName: "Quebec",
      cityKeyword: "quebec",
      provinceKeyword: "quebec",
    },
  ],
  canadaProvinces: [
    {
      provinceName: "Alberta",
      provinceKeyword: "alberta",
    },
    {
      provinceName: "British Columbia",
      provinceKeyword: "british-columbia",
    },
    {
      provinceName: "Manitoba",
      provinceKeyword: "manitoba",
    },
    {
      provinceName: "Ontario",
      provinceKeyword: "ontario",
    },
    {
      provinceName: "Quebec",
      provinceKeyword: "quebec",
    },
  ],
  usaCities: [
    {
      cityName: "Seattle",
      cityKeyword: "seattle",
      stateName: "Washington",
      stateKeyword: "washington-state",
    },
    {
      cityName: "Portland",
      cityKeyword: "portland",
      stateName: "Oregon",
      stateKeyword: "oregon",
    },
    {
      cityName: "Los Angeles",
      cityKeyword: "los-angeles",
      stateName: "California",
      stateKeyword: "california",
    },
    {
      cityName: "San Diego",
      cityKeyword: "san-diego",
      stateName: "California",
      stateKeyword: "california",
    },
    {
      cityName: "San Jose",
      cityKeyword: "san-jose",
      stateName: "California",
      stateKeyword: "california",
    },
    {
      cityName: "San Francisco",
      cityKeyword: "san-francisco",
      stateName: "California",
      stateKeyword: "california",
    },
    {
      cityName: "Mountain View",
      cityKeyword: "mountain-view",
      stateName: "California",
      stateKeyword: "california",
    },
    {
      cityName: "Santa Clara",
      cityKeyword: "santa-clara",
      stateName: "California",
      stateKeyword: "california",
    },
    {
      cityName: "Palo Alto",
      cityKeyword: "palo-alto",
      stateName: "California",
      stateKeyword: "california",
    },
    {
      cityName: "Sunnyvale",
      cityKeyword: "sunnyvale",
      stateName: "California",
      stateKeyword: "california",
    },
    {
      cityName: "Redwood City",
      cityKeyword: "redwood-city",
      stateName: "California",
      stateKeyword: "california",
    },
    {
      cityName: "Houston",
      cityKeyword: "houston",
      stateName: "Texas",
      stateKeyword: "texas",
    },
    {
      cityName: "San Antonio",
      cityKeyword: "san-antonio",
      stateName: "Texas",
      stateKeyword: "texas",
    },
    {
      cityName: "Dallas",
      cityKeyword: "dallas",
      stateName: "Texas",
      stateKeyword: "texas",
    },
    {
      cityName: "Austin",
      cityKeyword: "austin",
      stateName: "Texas",
      stateKeyword: "texas",
    },
    {
      cityName: "Jacksonville",
      cityKeyword: "jacksonville",
      stateName: "Florida",
      stateKeyword: "florida",
    },
    {
      cityName: "Miami",
      cityKeyword: "miami",
      stateName: "Florida",
      stateKeyword: "florida",
    },
    {
      cityName: "Tampa",
      cityKeyword: "tampa",
      stateName: "Florida",
      stateKeyword: "florida",
    },
    {
      cityName: "New York",
      cityKeyword: "new-york",
      stateName: "NewYork",
      stateKeyword: "new-york-state",
    },
    {
      cityName: "Boston",
      cityKeyword: "boston",
      stateName: "Massachusetts",
      stateKeyword: "massachusetts",
    },
    {
      cityName: "Chicago",
      cityKeyword: "chicago",
      stateName: "Illinois",
      stateKeyword: "illinois",
    },
    {
      cityName: "Phoenix",
      cityKeyword: "phoenix",
      stateName: "Arizona",
      stateKeyword: "arizona",
    },
    {
      cityName: "Philadelphia",
      cityKeyword: "philadelphia",
      stateName: "Pennsylvania",
      stateKeyword: "pennsylvania",
    },
  ],
  usaStates: [
    {
      stateName: "Washington",
      stateKeyword: "washington-state",
    },
    {
      stateName: "Oregon",
      stateKeyword: "oregon",
    },
    {
      stateName: "California",
      stateKeyword: "california",
    },
    {
      stateName: "Texas",
      stateKeyword: "texas",
    },
    {
      stateName: "Florida",
      stateKeyword: "florida",
    },
    {
      stateName: "NewYork",
      stateKeyword: "new-york-state",
    },
    {
      stateName: "Massachusetts",
      stateKeyword: "massachusetts",
    },
    {
      stateName: "Illinois",
      stateKeyword: "illinois",
    },
    {
      stateName: "Arizona",
      stateKeyword: "arizona",
    },
    {
      stateName: "Pennsylvania",
      stateKeyword: "pennsylvania",
    },
  ],
};

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
    const createGlassdoorURL = initializeGlassdoorURL(cityKeyword, jobKeyboard) 
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

    const createGlassdoorURL = initializeGlassdoorURL(cityKeyword, jobKeyboard) 
    console.log("test url", createGlassdoorURL(1))
    
    // 1. With the URL, get all job postings for this search
    //  @createGlassdoorURL only requires a PAGE_NUM now
    const postings = await getAllPostingsForSearch(createGlassdoorURL)

    fs.writeFileSync(`./data/${cityKeyword}.json`, JSON.stringify(postings));

    console.log(`Completed ${cityName} - ${provinceName}`);
  }
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

async function getAllPostingsForSearch(createGlassdoorURL) {
  const NUM_PAGES = 2;
  var jobListings = []
  
  for (let pageNum = 1; pageNum < NUM_PAGES + 1; pageNum += 1) {
    const url = createScrapeAPIURL(createGlassdoorURL(pageNum))

    var companyName,
      roleName,
      location,
      salaryRange,
      jobLink,
      companyRating,
      easyApply,
      jobAge

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

      jobLink = $(element).find(".css-l2wjgv").attr("href");
      jobLink = `https://glassdoor.com${jobLink}`;

      companyRating = $(element).find(".css-2lqh28").text();
      easyApply = $(element).find(".css-r3emcz").text();
      easyApply = easyApply.includes("Easy Apply");

      jobAge = $(element).find("div[data-test='job-age']").text();

      jobListings.push({
        companyName,
        roleName,
        location,
        salaryRange,
        jobLink,
        companyRating,
        easyApply,
        jobAge,
      });
    });
    console.log(`::Glassdoor Jobs -- Completed page ${pageNum} of ${NUM_PAGES}`);
  }

  console.log("Step 4: Completed all pages. \n", jobListings);
  return jobListings;
}

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
