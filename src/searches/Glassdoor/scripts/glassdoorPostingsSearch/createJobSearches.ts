import { IJobPostingsSearch } from "@/types/appInterfaces";
import { GLASSDOOR_JOBS_COMPANY_SIZES, SEARCH_ROLES } from "../../glassdoorConstants";

export default function createJobSearches(locationName: string): IJobPostingsSearch[] {
  const searches: IJobPostingsSearch[] = [];
  for (const roleName of SEARCH_ROLES) {
    for (const companySize of GLASSDOOR_JOBS_COMPANY_SIZES) {
      searches.push({ locationName, roleName, companySize: companySize.value });
    }
  }
  return searches;
}
