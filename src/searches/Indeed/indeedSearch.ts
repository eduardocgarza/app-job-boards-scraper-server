import fs from "fs";
import PuppBrowser from "@/helpers/PuppBrowser";
import initializeIndeedURLCreator from "./createIndeedURL";
import indeedGetPageResults from "./indeedGetPageResults";
import indeedGetJobsSearchSize from "./indeedGetJobsSearchSize";
import { IExecuteSearchObject, IJobPostingsSearch, IRawJobPosting } from "@/types/appInterfaces";
import createJobSearches from "../Glassdoor/scripts/glassdoorPostingsSearch/createJobSearches";

async function execSingleSearch(searchId: string, searchOptions: IJobPostingsSearch) {
  const { page, closeBrowser } = await PuppBrowser();

  // 1. Create URL based on search options
  console.log("@execSingleSearch - Before: initializedIndeedURLCreator");
  const createIndeedURL = initializeIndeedURLCreator(searchOptions);
  console.log("@execSingleSearch - After: initializedIndeedURLCreator");

  // 2. Get numItems and numPages from first page
  const indeedURL = createIndeedURL(1);

  console.log("@execSingleSearch - Before: Go To Page");
  await page.goto(indeedURL, { waitUntil: "networkidle0" });
  console.log("@execSingleSearch - After: Go To Page");

  console.log("@execSingleSearch - Before: Get Search Size");
  const numPages = await indeedGetJobsSearchSize(page);
  console.log("@execSingleSearch - After: Get Search Size");

  // 3. Iterate numPages through the URL to get all results
  const allPostings = [];

  for (let index = 0; index < numPages; index++) {
    const pageNumber = index + 1;
    const currentURL = createIndeedURL(pageNumber);

    await page.goto(currentURL, { waitUntil: "networkidle0" });

    console.log("@execSingleSearch - Before: @getPageResults");
    let pagePostings = await indeedGetPageResults(page);
    pagePostings = pagePostings.filter((v) => !!v.roleName);
    console.log(`Number of Job Postings Collected: ${pagePostings.length}`);
    console.log("@execSingleSearch - After: @getPageResults");

    allPostings.push(pagePostings);
    console.log(`Number of Total Job Postings Collected: ${allPostings.length}`);
  }
  fs.writeFileSync("./indeed-postings.json", JSON.stringify(allPostings, null, 2));
  await closeBrowser();
}

export default async function execIndeedSearch(searchObject: IExecuteSearchObject) {
  const { searchId, locationName } = searchObject;
  const searches = createJobSearches(locationName);

  for (const [index, searchOptions] of Object.entries(searches)) {
    if (index === "1") break;

    console.log(`Executing Search - ${index + 1} of ${searches.length}`);
    await execSingleSearch(searchId, searchOptions);
    console.log("--------------------\n\n\n");
  }

  console.log(`Inside - @execIndeedSearch: ${searchObject}`);
}
