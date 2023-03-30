import { ISearchObject } from "@/types/appInterfaces";
import getGlassdoorPostingsDetailedData from "./glassdoorPostingsDetailed/getGlassdoorPostingsDetailedData";
import getGlassdoorJobPostingsSearchList from "./glassdoorPostingsSearch/getGlassdoorJobPostingsList";

export default async function getGlassdoorPostingsSearchData(
  searchObject: ISearchObject,
) {
  await getGlassdoorJobPostingsSearchList(searchObject);
  await getGlassdoorPostingsDetailedData(searchObject.searchId);
}
