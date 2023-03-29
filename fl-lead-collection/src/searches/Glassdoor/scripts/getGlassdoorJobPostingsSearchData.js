import getGlassdoorJobPostingsDetailedData from "./getGlassdoorJobPostingsDetailedData";
import getGlassdoorJobPostingsSearchList from "./getGlassdoorJobPostingsList";

export default async function getGlassdoorJobPostingsSearchData(searchObject) {
  await getGlassdoorJobPostingsSearchList(searchObject);
  return;
  await getGlassdoorJobPostingsDetailedData(searchObject);
}