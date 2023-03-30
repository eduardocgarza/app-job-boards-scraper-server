import { ISearchObject } from "@/types/appInterfaces";
import getCompanyProfiles from "./getCompanyProfiles";
import getGlassdoorPostingsDetailedData from "./glassdoorPostingsDetailed/getGlassdoorPostingsDetailedData";

export default async function getGlassdoorCompanyDetailedData(
  searchObject: ISearchObject,
) {
  await getCompanyProfiles(searchObject);
  await getGlassdoorPostingsDetailedData(searchObject.searchId);
}
