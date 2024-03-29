import PuppBrowser from "@/helpers/PuppBrowser";
import { IJobPostingsSearch, IExecuteSearchObject } from "@/types/appInterfaces";
import createJobSearches from "./createJobSearches";
import getSearchResults from "./getSearchResults";
import initJobBrowserSearch from "./initBrowserSearch";
import getJobsSearchSize from "./getJobsSearchSize";
import createGlassdoorPostingURL from "./createGlassdoorPostingURL";

async function execSingleSearch(searchId: string, options: IJobPostingsSearch) {
  const { page, closeBrowser } = await PuppBrowser();
  const { locationName, roleName } = options;
  const searchCode = await initJobBrowserSearch(page, locationName, roleName);
  const glassdoorURL = createGlassdoorPostingURL(searchCode, options);
  await page.goto(glassdoorURL, { waitUntil: "networkidle0" });
  const numPages = await getJobsSearchSize(page);
  await getSearchResults(searchId, page, numPages);
  await closeBrowser();
}

export default async function getGlassdoorJobPostingsSearchList(searchObject: IExecuteSearchObject) {
  const { searchId, locationName } = searchObject;
  const searches: IJobPostingsSearch[] = createJobSearches(locationName);
  console.log(`Number of Searches: ${searches.length}.`);

  for (const [index, searchOptions] of Object.entries(searches)) {
    console.log(`==================== Start SEARCH - ${index} of ${searches.length} ====================`);
    await execSingleSearch(searchId, searchOptions);
    console.log(`==================== End SEARCH - ${index} of ${searches.length} ====================\n\n\n`);
  }
}
