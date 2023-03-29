import getGlassdoorCompaniesSearchData from "./getGlassdoorCompaniesSearchData";
import getGlassdoorCompanyDetailedData from "./getGlassdoorCompanyDetailedData";
import getGlassdoorJobPostingsSearchData from "./getGlassdoorJobPostingsSearchData";

export default async function executeGlassdoorSearch(searchObject) {
  console.log("Starting @getGlassdoorJobPostingsSearchData");
  await getGlassdoorJobPostingsSearchData(searchObject);
  console.log("Completed @getGlassdoorJobPostingsSearchData");
  return;

  console.log("Starting @getGlassdoorCompaniesSearchData");
  await getGlassdoorCompaniesSearchData(searchObject);
  console.log("Completed @getGlassdoorCompaniesSearchData");

  console.log("Starting @getGlassdoorCompanyDetailedData");
  await getGlassdoorCompanyDetailedData(searchObject);
  console.log("Completed @getGlassdoorCompanyDetailedData");

}
