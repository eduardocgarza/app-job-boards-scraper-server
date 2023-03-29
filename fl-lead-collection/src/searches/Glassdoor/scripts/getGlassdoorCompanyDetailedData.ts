import getCompanyProfiles from "./getCompanyProfiles";
import getGlassdoorJobPostingsDetailedData from "./getGlassdoorJobPostingsDetailedData";

export default async function getGlassdoorCompanyDetailedData(searchObject) {
  await getCompanyProfiles(searchObject);
  await getGlassdoorJobPostingsDetailedData(searchObject);
}