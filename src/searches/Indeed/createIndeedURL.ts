import { IJobPostingsSearch } from "@/types/appInterfaces";

const INDEED_JOBS_DATE_POSTED = {
  ONE_DAY: "1",
  THREE_DAYS: "3",
  SEVEN_DAYS: "7",
  FOURTEEN_DAYS: "14",
};

function urlEncode(url: string) {
  return url ? url.replaceAll(" ", "+").toLowerCase() : "";
}

export default function initializeIndeedURLCreator(options: IJobPostingsSearch) {
  const { locationName, roleName, datePosted: datePostedOption } = options;
  const baseURL = "https://ca.indeed.com/jobs";

  const formattedRoleName = urlEncode(roleName);
  const datePosted = INDEED_JOBS_DATE_POSTED.FOURTEEN_DAYS;
  const datePostedSetting = datePostedOption ? datePosted : "";

  const distance = "100";
  const sortByDate = "date";

  const jobType = "0kf%3Ajt%28fulltime%29%3B";
  const formattedLocation = encodeURIComponent(locationName.replace(/ /g, "+"));

  return function createIndeedURL(pageNum: number) {
    const currentPage = pageNum == 1 ? "" : `&start=${(pageNum - 1) * 10}`;
    return `${baseURL}?q=${formattedRoleName}&l=${formattedLocation}&sc=${jobType}&radius=${distance}&sort=${sortByDate}&fromage=${datePostedSetting}${currentPage}`;
  };
}
