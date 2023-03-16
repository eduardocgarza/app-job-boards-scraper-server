const fs = require("fs")
const axios = require("axios")
const cheerio = require("cheerio")
const puppeteer = require("puppeteer")
const ObjectsToCsv = require("objects-to-csv")

let jobListings = []

const SCRAPE_API_KEY = "4a6514ca562591433a23ffc4b284cc83"
const SCRAPE_BASE_URL = `http://api.scraperapi.com?api_key=${SCRAPE_API_KEY}&url=`

const GLASSDOOR_MAX_PAGES = 30
const DEV_MODE = true
const GLASSDOOR_NUM_PAGES = DEV_MODE ? 1 : GLASSDOOR_MAX_PAGES
const HEADLESS_MODE = true

const SEARCH_QUERY = "radius=100&jobType=fulltime&sortBy=date_desc"

function createGlassdoorURL(pageNum) {
  return `https://www.glassdoor.com/Job/vancouver-software-jobs-SRCH_IL.0,9_IC2278756_KO10,18_IP${pageNum}.htm?${SEARCH_QUERY}`
}

function createScrapeAPIURL(url) {
  return SCRAPE_BASE_URL + url
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
async function getGlassdoorData() {
  fs.writeFileSync("./output.json", JSON.stringify([]))
  
  // 1. Get jobs from one page
  console.log("::Starting... getAllJobsFromPostings()")
  const jobListings = await getAllJobsFromPostings(GLASSDOOR_NUM_PAGES)

  // 2. Save jobs to "glassdoorJobs.json"
  fs.writeFileSync("./glassdoorJobs.json", JSON.stringify(jobListings))
  console.log("::Saved jobs to glassdoorJobs.json")
  
  // 3. For each job post, get the company info
  let finalDataItems = []
  console.log("::Starting... getCompanyInfo()")
  for(let i = 0; i < jobListings.length; i++) {
    const {companyName, jobLink: jobPage} = jobListings[i]
    const url = createScrapeAPIURL(jobPage)
    console.log(":::Getting companyInfo for: ", companyName)
    const companyInfo = await getCompanyInfo(url)
    finalDataItems.push({...jobListings[i], ...companyInfo})
  }

  console.log("::Completed getCompanyInfo()")
  
  fs.writeFileSync("./output.json", JSON.stringify(finalDataItems))
  console.log("::Completed getGlassdoorData()")
}

async function getAllJobsFromPostings (NUM_PAGES) {
  for (let pageNumber = 1; pageNumber < NUM_PAGES+1; pageNumber += 1) {
    const glassdoorURL = createGlassdoorURL(pageNumber)
    const url = createScrapeAPIURL(glassdoorURL)

    var companyName, roleName, location, salaryRange, jobLink, companyRating, easyApply, jobAge

    const page = await axios(url)
    const html = await page.data
    const $ = cheerio.load(html)
    const allJobs = $("[data-test='jobListing']")

    allJobs.each((_, element) => {
      companyName = $(element).find(".css-l2wjgv").text()
      roleName = $(element).find(".css-1rd3saf").text()

      location = $(element).find(".e1rrn5ka0").text()
      salaryRange = $(element).find(".css-1xe2xww").text()
      salaryRange = salaryRange.split("(")[0]

      jobLink = $(element).find(".css-l2wjgv").attr("href")
      jobLink = `https://glassdoor.com${jobLink}`

      companyRating = $(element).find(".css-2lqh28").text()
      easyApply = $(element).find(".css-r3emcz").text()
      easyApply = easyApply.includes("Easy Apply")

      jobAge = $(element).find("div[data-test='job-age']").text()

      jobListings.push({ companyName, roleName, location, salaryRange, jobLink, companyRating, easyApply, jobAge })
    })
    console.log(`Glassdoor Jobs -- Completed page ${pageNumber} of ${NUM_PAGES}`)
  }

  console.log("-- Completed all pages --")
  return jobListings
}

async function getCompanyInfo(jobPage) {
  console.log("Getting job page...", jobPage)

  const browser = await puppeteer.launch({ headless: HEADLESS_MODE, defaultViewport: null })
  const page = await browser.newPage()
  console.log("New page created")
  
  await page.goto(jobPage, { waitUntil: "networkidle0" })
  console.log("Completed waiting for network idle")

  // Extract "Job" Description
  var jobDescription = ""
  if (await page.$("#JobDescriptionContainer") != null) {
    jobDescription = await page.$eval("#JobDescriptionContainer", el => el.textContent)
  }

  if(await page.$(".link.py-xsm.px-std") == null) {
    console.log(">> Did not find button. Closing browser...")
    await browser.close()
    return {
      companyLink: "",
      headquarters: "",
      sector: "",
      companySize: "",
      industry: "",
      revenue: "",
      jobDescription
    }
  }
  
  // Click on "Company"
  await page.click(".link.py-xsm.px-std")
  await page.waitForSelector("a.link")

  var companyLink, headquarters, sector, companySize, industry, revenue

  companyLink = await page.$eval("a.link", el => el.href)

  async function getText(query) {
    if (await page.$(query) == null) return ""
    return page.$eval(query, el => el.textContent)
  }

  headquarters = await getText("#headquarters")
  sector = await getText("#primaryIndustry.sectorName")
  companySize = await getText("#size")
  industry = await getText("#primaryIndustry.industryName")
  revenue = await getText("#revenue")

  await browser.close()
  
  return {
    companyLink,
    headquarters,
    sector,
    companySize,
    industry,
    revenue,
    jobDescription
  }

}
getGlassdoorData()