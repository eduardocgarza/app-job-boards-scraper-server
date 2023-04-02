import { JOB_PLATFORMS } from "@/appConstants";
import insertSearches from "@/database/databaseActions/insertSearches";
import { SEARCH_ROLES } from "@/searches/Glassdoor/glassdoorConstants";
import { ISearch } from "@/types/appInterfaces";

function createRandomSearches(numSearches: number): ISearch[] {
  return Array.from({ length: numSearches }, (_, i) => ({
    campaignName: `Campaign ${i + 1}`,
    campaignDescription: `Search for campaign ${i + 1}`,
    locationName: `Location ${i + 1}`,
    roles: SEARCH_ROLES,
    platforms: JOB_PLATFORMS.getNames(),
  }));
}

export default async function testPopulateSearches(numSearches: number) {
  const searches = createRandomSearches(numSearches);
  return await insertSearches(searches);
}
