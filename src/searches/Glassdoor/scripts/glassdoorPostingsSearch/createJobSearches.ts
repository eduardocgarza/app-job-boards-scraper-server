import { IJobPostingsSearch } from "@/types/appInterfaces";
import { SEARCH_ROLES } from "../../glassdoorConstants";

export default function createJobSearches(locationName: string): IJobPostingsSearch[] {
  const searches: IJobPostingsSearch[] = [];
  for (const roleName of SEARCH_ROLES) {
    searches.push({ locationName, roleName, datePosted: true });
    searches.push({ locationName, roleName, datePosted: false });
    // for (const companySize of GLASSDOOR_JOBS_COMPANY_SIZES) {
    // searches.push({ locationName, roleName, companySize: companySize.value });
    // }
  }
  return searches;
}
