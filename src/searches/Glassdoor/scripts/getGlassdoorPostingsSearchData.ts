import { IExecuteSearchObject } from "@/types/appInterfaces";
import getGlassdoorPostingsDetailedData from "./glassdoorPostingsDetailed/getGlassdoorPostingsDetailedData";
import getGlassdoorJobPostingsSearchList from "./glassdoorPostingsSearch/getGlassdoorJobPostingsList";

export default async function getGlassdoorPostingsSearchData(
  searchObject: IExecuteSearchObject,
) {
  await getGlassdoorJobPostingsSearchList(searchObject);
  await getGlassdoorPostingsDetailedData(searchObject);
}
