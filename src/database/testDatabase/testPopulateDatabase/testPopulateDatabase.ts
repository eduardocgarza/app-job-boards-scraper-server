import { IJobPosting, IRawJobPosting } from "@/types/appInterfaces";

const TEST_SEARCHES = 10;
const TEST_NUM_SEARCH_POSTS = 15;

function getRandomPostings(postings: IJobPosting[], size: number) {
  const shuffled = postings.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

export function getUniqueTeamNames(jobPostings: IRawJobPosting[]): string[] {
  const uniqueTeamNames: string[] = [];
  jobPostings.forEach((company) => {
    if (!uniqueTeamNames.includes(company.teamName)) {
      uniqueTeamNames.push(company.teamName);
    }
  });
  return uniqueTeamNames;
}

export default async function populateDatabase(rawPostings: IRawJobPosting[]) {
  return [];
  // const numPosts = TEST_NUM_SEARCH_POSTS;
  // try {
  //   const searchRecords = await testPopulateSearches(TEST_SEARCHES);
  //   const uniqueTeams = getUniqueTeamNames(rawPostings);
  //   const companies = await populateCompanies(uniqueTeams.length);
  //   const teams = await populateTeams(uniqueTeams, companies);
  //   const teamsMap = createTeamsHashMap(teams);
  //   const jobPostings = await populateJobPostings(teamsMap, rawPostings);
  //   for (const { searchId } of searchRecords) {
  //     const searchPostings = getRandomPostings(jobPostings, numPosts);
  //     // const uniqueCompanyIds = getUniqueCompanyIds(searchPostings);
  //     // const uniquePostingIds = getUniquePostingIds(searchPostings);
  //     await populateSearchCompanyRecords(searchId, uniqueCompanyIds);
  //     await populateSearchPostingRecords(searchId, uniquePostingIds);
  //   }
  //   return searchRecords;
  // } catch (e) {
  //   console.error("Error populating database:", e);
  //   throw e;
  // }
}
