import getGlassdoorJobPostingsDetailedData from "./getGlassdoorJobPostingsDetailedData.js"
import getGlassdoorJobPostingsSearchList from "./getGlassdoorJobPostingsList.js"

export default async function getGlassdoorJobPostingsSearchData(searchObject) {
  await getGlassdoorJobPostingsSearchList(searchObject)
  return
  await getGlassdoorJobPostingsDetailedData(searchObject)
}