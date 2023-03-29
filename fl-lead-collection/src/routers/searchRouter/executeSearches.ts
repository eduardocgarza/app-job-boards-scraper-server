import { JOB_PLATFORMS } from "@/appConstants";
import executeGlassdoorSearch from "@/searches/Glassdoor/scripts/executeGlassdoorSearch";
import execIndeedSearch from "@/searches/Indeed/indeedSearch";
import execLinkedinSearch from "@/searches/Linkedin/linkedinSearch";
import execMonsterSearch from "@/searches/Monster/monsterSearch";
import execZipRecruiterSearch from "@/searches/ZipRecruiter/zipRecruiterSearch";

const jobPlatforms = JOB_PLATFORMS.getHashMap();

export interface IRawSearchObject {
  campaignName: string;
  campaignDescription: string;
  locationName: string;
  roles: string[];
  platforms: string[];
}

export interface ISearchObject extends IRawSearchObject {
  searchId: string;
  createdAt: string;
}

export async function executeSearches(searchObject: ISearchObject) {
  const { platforms } = searchObject;
  if (platforms.includes(jobPlatforms.GLASSDOOR)) {
    await executeGlassdoorSearch(searchObject);
  }
  if (platforms.includes(jobPlatforms.INDEED)) {
    await execIndeedSearch(searchObject);
  }
  if (platforms.includes(jobPlatforms.LINKEDIN)) {
    await execLinkedinSearch(searchObject);
  }
  if (platforms.includes(jobPlatforms.MONSTER)) {
    await execMonsterSearch(searchObject);
  }
  if (platforms.includes(jobPlatforms.ZIPRECRUITER)) {
    await execZipRecruiterSearch(searchObject);
  }
}
