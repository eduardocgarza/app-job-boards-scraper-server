import getGlassdoorCompaniesSearchData from "./getGlassdoorCompaniesSearchData.js"
import getGlassdoorCompanyDetailedData from "./getGlassdoorCompanyDetailedData.js"
import getGlassdoorJobPostingsSearchData from "./getGlassdoorJobPostingsSearchData.js"

export default async function executeGlassdoorSearch(searchObject) {
  console.log("Starting @getGlassdoorJobPostingsSearchData")
  await getGlassdoorJobPostingsSearchData(searchObject)
  console.log("Completed @getGlassdoorJobPostingsSearchData")
  
  console.log("Starting @getGlassdoorCompaniesSearchData")
  await getGlassdoorCompaniesSearchData(searchObject)
  console.log("Completed @getGlassdoorCompaniesSearchData")
  
  console.log("Starting @getGlassdoorCompanyDetailedData")
  await getGlassdoorCompanyDetailedData(searchObject)
  console.log("Completed @getGlassdoorCompanyDetailedData")
  
}
