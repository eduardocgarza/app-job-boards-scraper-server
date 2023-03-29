import { JOB_PLATFORMS } from "../../appConstants.js"
import executeGlassdoorSearch from "../../searches/Glassdoor/scripts/executeGlassdoorSearch.js"
import execIndeedSearch from "../../searches/Indeed/indeedSearch.js"
import execLinkedinSearch from "../../searches/Linkedin/linkedinSearch.js"
import execMonsterSearch from "../../searches/Monster/monsterSearch.js"
import execZipRecruiterSearch from "../../searches/ZipRecruiter/zipRecruiterSearch.js"

const jobPlatforms = JOB_PLATFORMS.getHashMap()

export async function executeSearches(searchObject) {
  const { platforms } = searchObject
  if (platforms.includes(jobPlatforms.GLASSDOOR)) {
    await executeGlassdoorSearch(searchObject)
  }
  if (platforms.includes(jobPlatforms.INDEED)) {
    await execIndeedSearch(searchObject)
  }
  if (platforms.includes(jobPlatforms.LINKEDIN)) {
    await execLinkedinSearch(searchObject)
  }
  if (platforms.includes(jobPlatforms.MONSTER)) {
    await execMonsterSearch(searchObject)
  }
  if (platforms.includes(jobPlatforms.ZIPRECRUITER)) {
    await execZipRecruiterSearch(searchObject)
  }
}
