import { IJobPosting, IRawJobPosting } from "@/types/appInterfaces";
import testPopulateSearches from "./testPopulateSearches";
import populateCompanies from "./populateCompanies";
import populateJobPostings from "./populateJobPostings";
import populateSearchCompanyRecords from "./populateSearchCompanyRecords";
import populateSearchPostingRecords from "./populateSearchPostingRecords";
import populateTeams from "./populateTeams";
import createTeamsHashMap from "@/database/helpers/createTeamsHashMap";

const TEST_SEARCHES = 10;
const TEST_NUM_SEARCH_POSTS = 15;

function getRandomPostings(postings: IJobPosting[], size: number) {
  const shuffled = postings.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

export function getUniqueCompanyIds(jobPostings: IJobPosting[]) {
  const companyIds: string[] = [];
  jobPostings.forEach((posting) => {
    if (!companyIds.includes(posting.companyId)) {
      companyIds.push(posting.companyId);
    }
  });
  return companyIds;
}

export function getUniqueTeamNames(jobPostings: IRawJobPosting[]): string[] {
  const uniqueCompanyNames: string[] = [];
  jobPostings.forEach((company) => {
    if (!uniqueCompanyNames.includes(company.teamName)) {
      uniqueCompanyNames.push(company.teamName);
    }
  });
  return uniqueCompanyNames;
}

export function getUniquePostingIds(jobPostings: IJobPosting[]) {
  return jobPostings.map((v) => v.postingId);
}

export default async function populateDatabase(rawPostings: IRawJobPosting[]) {
  const numPosts = TEST_NUM_SEARCH_POSTS;
  try {
    const searchRecords = await testPopulateSearches(TEST_SEARCHES);
    const companies = await populateCompanies(rawPostings);
    const teams = await populateTeams(rawPostings, companies);
    const teamsMap = createTeamsHashMap(teams);
    const jobPostings = await populateJobPostings(teamsMap, rawPostings);
    for (const { searchId } of searchRecords) {
      const searchPostings = getRandomPostings(jobPostings, numPosts);
      const uniqueCompanyIds = getUniqueCompanyIds(searchPostings);
      const uniquePostingIds = getUniquePostingIds(searchPostings);
      await populateSearchCompanyRecords(searchId, uniqueCompanyIds);
      await populateSearchPostingRecords(searchId, uniquePostingIds);
    }
    return searchRecords;
  } catch (e) {
    console.error("Error populating database:", e);
    throw e;
  }
}
