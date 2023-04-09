import { JOB_PLATFORMS } from "@/appConstants";
import executeGlassdoorSearch from "@/searches/Glassdoor/scripts/executeGlassdoorSearch";
import execIndeedSearch from "@/searches/Indeed/indeedSearch";
import execLinkedinSearch from "@/searches/Linkedin/linkedinSearch";
import execMonsterSearch from "@/searches/Monster/monsterSearch";
import execZipRecruiterSearch from "@/searches/ZipRecruiter/zipRecruiterSearch";
import { IExecuteSearchObject } from "@/types/appInterfaces";

const jobPlatforms = JOB_PLATFORMS.getHashMap();

export async function executeSearches(searchObject: IExecuteSearchObject) {
  const { platforms } = searchObject;
  if (platforms.includes(jobPlatforms.GLASSDOOR)) {
    await executeGlassdoorSearch(searchObject);
  }
  if (platforms.includes(jobPlatforms.INDEED)) {
    // await execIndeedSearch(searchObject);
  }
  if (platforms.includes(jobPlatforms.LINKEDIN)) {
    // await execLinkedinSearch(searchObject);
  }
  if (platforms.includes(jobPlatforms.MONSTER)) {
    // await execMonsterSearch(searchObject);
  }
  if (platforms.includes(jobPlatforms.ZIPRECRUITER)) {
    // await execZipRecruiterSearch(searchObject);
  }
}
