import testPopulateSearches from "./testPopulateSearches";
import testPopulateCompanies from "./testPopulateCompanies";
import testPopulateJobPostings from "./testPopulateJobPostings";
import testPopulateSearchCompanyRecords from "./testPopulateSearchCompanyRecords";
import testPopulateSearchPostingRecords from "./testPopulateSearchPostingRecords";
import { ICompany, ICompanyHashMap, IJobPosting, IRawJobPosting } from "@/types/appInterfaces";

const TEST_SEARCHES = 10;
const TEST_NUM_SEARCH_POSTS = 15;

function getRandomPostings(postings: IJobPosting[], size: number) {
  const shuffled = postings.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

function createCompaniesMap(uniqueCompanies: ICompany[]): ICompanyHashMap {
  const hashMap: ICompanyHashMap = {};
  for (const company of uniqueCompanies) {
    hashMap[company.companyName] = company;
  }
  return hashMap;
}

function getUniqueCompanyIds(jobPostings: IJobPosting[]) {
  const companyIds: string[] = [];
  jobPostings.forEach((posting) => {
    if (!companyIds.includes(posting.companyId)) {
      companyIds.push(posting.companyId);
    }
  });
  return companyIds;
}

function getUniquePostingIds(jobPostings: IJobPosting[]) {
  return jobPostings.map((v) => v.postingId);
}

export default async function populateDatabase(rawPostings: IRawJobPosting[]) {
  const numPosts = TEST_NUM_SEARCH_POSTS;
  try {
    const searchRecords = await testPopulateSearches(TEST_SEARCHES);
    const companies = await testPopulateCompanies(rawPostings);
    const companiesMap = createCompaniesMap(companies);
    const jobPostings = await testPopulateJobPostings(companiesMap, rawPostings);

    for (const { searchId } of searchRecords) {
      const searchPostings = getRandomPostings(jobPostings, numPosts);
      const uniqueCompanyIds = getUniqueCompanyIds(searchPostings);
      const uniquePostingIds = getUniquePostingIds(searchPostings);
      await testPopulateSearchCompanyRecords(searchId, uniqueCompanyIds);
      await testPopulateSearchPostingRecords(searchId, uniquePostingIds);
    }
    console.log("Database populated successfully.");
    return searchRecords;
  } catch (e) {
    console.error("Error populating database:", e);
    throw e;
  }
}
