import { ISearchObject } from "@/controllers/search/executeSearches";
import getCompanyProfiles from "./getCompanyProfiles";
import getGlassdoorJobPostingsDetailedData from "./getGlassdoorJobPostingsDetailedData";

export default async function getGlassdoorCompanyDetailedData(searchObject: ISearchObject) {
  await getCompanyProfiles(searchObject);
  await getGlassdoorJobPostingsDetailedData(searchObject.searchId);
}
