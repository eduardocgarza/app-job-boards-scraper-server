import { IExecuteSearchObject } from "@/types/appInterfaces";
import getGlassdoorCompaniesSearchData from "./getGlassdoorCompaniesSearchData";
import getGlassdoorCompanyDetailedData from "./getGlassdoorCompanyDetailedData";
import getGlassdoorPostingsSearchData from "./getGlassdoorPostingsSearchData";

export default async function executeGlassdoorSearch(searchObject: IExecuteSearchObject) {
  console.log("Starting @getGlassdoorPostingsSearchData");
  // await getGlassdoorPostingsSearchData(searchObject);
  console.log("Completed @getGlassdoorPostingsSearchData");
  // Future Implementation
  console.log("Starting @getGlassdoorCompaniesSearchData");
  await getGlassdoorCompaniesSearchData(searchObject);
  console.log("Completed @getGlassdoorCompaniesSearchData");
  return;

  console.log("Starting @getGlassdoorCompanyDetailedData");
  await getGlassdoorCompanyDetailedData(searchObject);
  console.log("Completed @getGlassdoorCompanyDetailedData");
}
