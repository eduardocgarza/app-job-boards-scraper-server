import { ISearchObject } from "@/controllers/search/executeSearches";
import getGlassdoorJobPostingsDetailedData from "./getGlassdoorJobPostingsDetailedData";
import getGlassdoorJobPostingsSearchList from "./getGlassdoorJobPostingsList";

export default async function getGlassdoorJobPostingsSearchData(searchObject: ISearchObject) {
  await getGlassdoorJobPostingsSearchList(searchObject);
  return;
  await getGlassdoorJobPostingsDetailedData(searchObject);
}
