const puppeteer = require("puppeteer");

/**
 * Steps
 * 
 * 1. Open URL = (Saved URL for searches)
 *  https://vancouver.craigslist.org/search/jjj?bundleDuplicates=1&employment_type=1&query=software#search=1~thumb~0~0
 * 
 * 2. Scrape page
 * 3. Click to next page, and continue until the end
 * 
 */