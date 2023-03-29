import getCompanyProfiles from "./getCompanyProfiles.js"
import getGlassdoorJobPostingsDetailedData from "./getGlassdoorJobPostingsDetailedData.js"

export default async function getGlassdoorCompanyDetailedData(searchObject) {
  await getCompanyProfiles(searchObject)
  await getGlassdoorJobPostingsDetailedData(searchObject)
}