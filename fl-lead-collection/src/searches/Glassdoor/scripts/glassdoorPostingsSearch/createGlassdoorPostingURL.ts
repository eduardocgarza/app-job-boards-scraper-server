import { IJobPostingsSearch } from "@/types/appInterfaces";
import {
  GLASSDOOR_JOBS_DATE_POSTED,
  GLASSDOOR_JOBS_DISTANCE,
  GLASSDOOR_JOBS_EASY_APPLY,
} from "../../glassdoorConstants";

export default function createGlassdoorPostingURL(
  searchCode: string,
  options: IJobPostingsSearch,
) {
  const { locationName, roleName, companySize } = options;
  const baseURL = "https://www.glassdoor.com/Job";
  const urlEncode = (url: string) => url.replaceAll(" ", "-").toLowerCase();
  const formattedLocationName = urlEncode(locationName);
  const formattedRoleName = urlEncode(roleName);
  const jobType = "fulltime";
  const sortBy = "date_desc";
  const datePosted = GLASSDOOR_JOBS_DATE_POSTED.THIRTY;
  const distance = GLASSDOOR_JOBS_DISTANCE.HUNDRED;
  const easyApplyState = GLASSDOOR_JOBS_EASY_APPLY.REGULAR;
  const easyApply = easyApplyState ? `&applicationType=${easyApplyState}` : "";
  return `${baseURL}/${formattedLocationName}-${formattedRoleName}-jobs-${searchCode}.htm?jobType=${jobType}&fromAge=${datePosted}&radius=${distance}${easyApply}&employerSizes=${companySize}&sortBy=${sortBy}`;
}
