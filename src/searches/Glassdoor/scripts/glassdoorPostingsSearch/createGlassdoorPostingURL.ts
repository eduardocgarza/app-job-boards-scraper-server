import { IJobPostingsSearch } from "@/types/appInterfaces";
import { GLASSDOOR_JOBS_DATE_POSTED, GLASSDOOR_JOBS_DISTANCE, GLASSDOOR_JOBS_EASY_APPLY } from "../../glassdoorConstants";

function urlEncode(url: string) {
  return url ? url.replaceAll(" ", "-").toLowerCase() : "";
}

export default function createGlassdoorPostingURL(searchCode: string, options: IJobPostingsSearch) {
  const { locationName, roleName, datePosted: datePostedOption } = options;

  const baseURL = "https://www.glassdoor.com/Job";

  const formattedLocationName = urlEncode(locationName);
  const formattedRoleName = urlEncode(roleName);
  const jobType = "fulltime";
  const sortBy = "date_desc";

  const datePosted = GLASSDOOR_JOBS_DATE_POSTED.THIRTY;
  const datePostedSetting = datePostedOption ? `&fromAge=${datePosted}` : "";

  const distance = GLASSDOOR_JOBS_DISTANCE.HUNDRED;
  const easyApplyState = GLASSDOOR_JOBS_EASY_APPLY.REGULAR;
  const easyApply = easyApplyState ? `&applicationType=${easyApplyState}` : "";

  return `${baseURL}/${formattedLocationName}-${formattedRoleName}-jobs-${searchCode}.htm?jobType=${jobType}${datePostedSetting}&radius=${distance}${easyApply}&sortBy=${sortBy}`;

  // return `${baseURL}/${formattedLocationName}-${formattedRoleName}-jobs-${searchCode}.htm?jobType=${jobType}&fromAge=${datePosted}&radius=${distance}${easyApply}&sortBy=${sortBy}`;

  // return `${baseURL}/${formattedLocationName}-${formattedRoleName}-jobs-${searchCode}.htm?jobType=${jobType}&fromAge=${datePosted}&radius=${distance}${easyApply}&employerSizes=${companySize}&sortBy=${sortBy}`;
}
