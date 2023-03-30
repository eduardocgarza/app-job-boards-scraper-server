import PuppBrowser from "@/helpers/PuppBrowser";
import { IJobPostingsSearch, ISearchObject } from "@/types/appInterfaces";
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

export default async function getGlassdoorJobPostingsSearchList(
  searchObject: ISearchObject,
) {
  const { searchId, locationName } = searchObject;
  const searches: IJobPostingsSearch[] = createJobSearches(locationName);
  const index = 3;
  for (const searchOptions of searches) {
    await execSingleSearch(searchId, searchOptions);
    console.log("Completed 1 Search");
    if (index === 3) {
      break;
    }
  }
}