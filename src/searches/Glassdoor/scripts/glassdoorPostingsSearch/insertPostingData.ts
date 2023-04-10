import { pool } from "@/database/databaseConfiguration";
import { IRawJobPosting, ITeam } from "@/types/appInterfaces";
import { insertCompanies } from "@/database/databaseActions/insertCompanies";
import { ICompanyObject } from "@/database/databaseDataConverters/companyConverterOut";
import { getUniqueTeamNames } from "@/database/testDatabase/testPopulateDatabase/testPopulateDatabase";
import createTeamsHashMap from "@/database/helpers/createTeamsHashMap";
import populateJobPostings from "@/database/testDatabase/testPopulateDatabase/populateJobPostings";
import insertTeams from "@/database/databaseActions/insertTeams";
import updateTeams from "@/database/databaseActions/updateTeams";
import populateSearchPostingRecords from "@/database/testDatabase/testPopulateDatabase/populateSearchPostingRecords";
import populateSearchCompanyRecords from "@/database/testDatabase/testPopulateDatabase/populateSearchCompanyRecords";
import { jobPostingsTable } from "@/database/dbConstants";

async function filterNewPostings(rawPostings: IRawJobPosting[]): Promise<IRawJobPosting[]> {
  const client = await pool.connect();

  const platformPostingIds = rawPostings.map((posting) => posting.platformPostingId);
  const placeholders = platformPostingIds.map((_, i) => `$${i + 1}`).join(",");

  const query = `
    SELECT platform_posting_id FROM ${jobPostingsTable}
    WHERE platform_posting_id IN (${placeholders});
  `;

  try {
    const existingPostingsResponse = await client.query(query, platformPostingIds);
    const existingPostingIds = new Set(existingPostingsResponse.rows.map((row) => row.platform_posting_id));
    const newPostings = rawPostings.filter((posting) => !existingPostingIds.has(posting.platformPostingId));
    return newPostings;
  } catch (error) {
    throw new Error("Error inside filterNewPostings: " + error);
  } finally {
    client.release();
  }
}

export default async function insertPostingsData(searchId: string, rawPostings: IRawJobPosting[]) {
  // First, filter the postings and only keep the postings not inside the database
  const newPostings = await filterNewPostings(rawPostings);

  // Get unique teams from job postings page results
  const client = await pool.connect();
  const uniqueTeams = getUniqueTeamNames(newPostings);

  // Add unique teams to db; returns unique teams not previously in db
  let allTeams: ITeam[] = [],
    newTeams: ITeam[] = [];
  try {
    const { allTeams: allTeamsRes, newTeams: newTeamsRes } = await insertTeams(uniqueTeams);
    allTeams = allTeamsRes;
    newTeams = newTeamsRes;
  } catch (error) {
    console.log("ERROR -- @insertTeams: ", error);
    throw new Error("Error:" + error);
  }

  // Add same number of new companies to db as newTeams lengths
  let newCompanies: ICompanyObject[];
  try {
    newCompanies = await insertCompanies(uniqueTeams);
  } catch (error) {
    console.log("ERROR -- @insertCompanies: ", error);
    throw new Error("Error:" + error);
  }

  // Associate the new companies from db with the new, unique teams
  newCompanies.forEach((company, index) => {
    if (newTeams[index]) {
      newTeams[index].companyId = company.companyId;
    }
    if (allTeams[index]) {
      allTeams[index].companyId = company.companyId;
    }
  });

  // Update the new, unique teams in the db to include the company_id
  try {
    await updateTeams(newTeams);
  } catch (error) {
    console.log("ERROR -- @updateTeams: ", error);
    throw new Error("Error:" + error);
  }
  // For the new company_id's, add associate them to the search_id
  const uniqueCompanyIds = newCompanies.map((c) => c.companyId);

  try {
    await populateSearchCompanyRecords(searchId, uniqueCompanyIds);
  } catch (error) {
    console.log("ERROR -- @populateSearchCompanyRecords: ", error);
    throw new Error("Error:" + error);
  }

  // Add the new postings; returns only newly added to db
  const teamsMap = createTeamsHashMap(allTeams);

  let uniquePostings;
  try {
    uniquePostings = await populateJobPostings(teamsMap, newPostings, "Glassdoor");
  } catch (error) {
    console.log("ERROR -- @populateJobPostings: ", error);
    throw new Error("Error:" + error);
  }

  const uniquePostingIds = uniquePostings.map((v) => v.postingId);
  try {
    await populateSearchPostingRecords(searchId, uniquePostingIds);
  } catch (error) {
    console.log("ERROR -- @populateSearchPostingRecords: ", error);
    throw new Error("Error:" + error);
  }

  client.release();
}
