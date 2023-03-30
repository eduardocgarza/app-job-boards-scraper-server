import { pool } from "@/database/databaseConfiguration";
import { IRawJobPosting } from "@/types/appInterfaces";
import populateTeams from "@/database/testDatabase/testPopulateDatabase/populateTeams";
import createTeamsHashMap from "@/database/helpers/createTeamsHashMap";
import populateCompanies from "@/database/testDatabase/testPopulateDatabase/populateCompanies";
import populateJobPostings from "@/database/testDatabase/testPopulateDatabase/populateJobPostings";
import testPopulateSearchPostingRecords from "@/database/testDatabase/testPopulateDatabase/testPopulateSearchPostingRecords";
import populateSearchCompanyRecords from "@/database/testDatabase/testPopulateDatabase/populateSearchCompanyRecords";
import {
  getUniqueCompanyIds,
  getUniquePostingIds,
} from "@/database/testDatabase/testPopulateDatabase/testPopulateDatabase";

export default async function insertPostingsData(
  searchId: string,
  rawPostings: IRawJobPosting[],
) {
  const client = await pool.connect();
  try {
    const companies = await populateCompanies(rawPostings);
    const teams = await populateTeams(rawPostings, companies);
    const teamsMap = createTeamsHashMap(teams);
    const jobPostings = await populateJobPostings(teamsMap, rawPostings);
    const uniqueCompanyIds = getUniqueCompanyIds(jobPostings);
    const uniquePostingIds = getUniquePostingIds(jobPostings);
    await populateSearchCompanyRecords(searchId, uniqueCompanyIds);
    await testPopulateSearchPostingRecords(searchId, uniquePostingIds);
  } catch (e) {
    console.log("-- ERROR in GLASSDOOR @insertData() --", e);
    throw e;
  } finally {
    client.release();
    console.log("Successful Write.");
  }
}
