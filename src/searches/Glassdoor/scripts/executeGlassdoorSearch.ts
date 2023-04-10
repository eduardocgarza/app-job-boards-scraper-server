import { IExecuteSearchObject } from "@/types/appInterfaces";
import getGlassdoorCompaniesSearchData from "./getGlassdoorCompaniesSearchData";
import getGlassdoorCompanyDetailedData from "./getGlassdoorCompanyDetailedData";
import getGlassdoorPostingsSearchData from "./getGlassdoorPostingsSearchData";

export default async function executeGlassdoorSearch(searchObject: IExecuteSearchObject) {
  await getGlassdoorPostingsSearchData(searchObject);
  await getGlassdoorCompaniesSearchData(searchObject);
  return;
  await getGlassdoorCompanyDetailedData(searchObject);
}
