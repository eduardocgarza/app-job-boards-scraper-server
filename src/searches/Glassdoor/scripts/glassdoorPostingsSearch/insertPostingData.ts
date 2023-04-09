import { pool } from "@/database/databaseConfiguration";
import { IRawJobPosting, ITeam } from "@/types/appInterfaces";
import createTeamsHashMap from "@/database/helpers/createTeamsHashMap";
import populateJobPostings from "@/database/testDatabase/testPopulateDatabase/populateJobPostings";
import insertTeams from "@/database/databaseActions/insertTeams";
import { insertCompanies } from "@/database/databaseActions/insertCompanies";
import { ICompanyObject } from "@/database/databaseDataConverters/companyConverterOut";
import updateTeams from "@/database/databaseActions/updateTeams";
import populateSearchPostingRecords from "@/database/testDatabase/testPopulateDatabase/populateSearchPostingRecords";
import populateSearchCompanyRecords from "@/database/testDatabase/testPopulateDatabase/populateSearchCompanyRecords";
import { getUniqueTeamNames } from "@/database/testDatabase/testPopulateDatabase/testPopulateDatabase";
import fs from "fs";

export default async function insertPostingsData(searchId: string, rawPostings: IRawJobPosting[], index: number) {
  const client = await pool.connect();
  console.log("******************** Start of @insertPostingData ********************");
  console.log("@insertPostingsData - Number of Raw Postings: ", rawPostings.length);

  // Get unique teams from job postings page results
  const uniqueTeams = getUniqueTeamNames(rawPostings);
  console.log("@insertPostingsData: Number of Unique Teams", uniqueTeams.length, " \n\n");

  // Add unique teams to db; returns unique teams not previously in db
  console.log("@insertPostingsData - Start: @populateTeams");
  let allTeams: ITeam[] = [],
    newTeams: ITeam[] = [];
  try {
    const { allTeams: allTeamsRes, newTeams: newTeamsRes } = await insertTeams(uniqueTeams);
    allTeams = allTeamsRes;
    newTeams = newTeamsRes;
    console.log(`- Created New Teams: ${newTeams.length}`);
    console.log(`- All New Teams: ${allTeams.length}`);
  } catch (error) {
    console.log("ERROR -- @insertTeams: ", error);
    throw new Error("Error:" + error);
  }
  console.log("@insertPostingsData - End: @populateTeams");
  console.log("@insertPostingsData - Number of New Teams Inserted: ", newTeams.length, "\n\n");

  // Add same number of new companies to db as newTeams lengths
  console.log("@insertPostingsData - Before: @populateCompanies");
  let newCompanies: ICompanyObject[];
  try {
    newCompanies = await insertCompanies(uniqueTeams);
    console.log(`Created New Companies: ${newCompanies.length}`);
  } catch (error) {
    console.log("ERROR -- @insertCompanies: ", error);
    throw new Error("Error:" + error);
  }
  console.log("@insertPostingsData - After: @populateCompanies");
  console.log("@insertPostingsData - New Companies Inserted: ", newCompanies.length, "\n\n");
  console.log("--");
  console.log(newCompanies);
  console.log("--");
  console.log(allTeams);
  console.log("--");

  // Associate the new companies from db with the new, unique teams
  console.log("@insertPostingsData - Before Mapping");
  console.log("newCompanies: ", newCompanies.length);
  console.log("newTeams: ", newTeams.length);
  console.log("allTeams: ", allTeams.length);
  newCompanies.forEach((company, index) => {
    if (newTeams[index]) {
      newTeams[index].companyId = company.companyId;
    }
    if (allTeams[index]) {
      allTeams[index].companyId = company.companyId;
    }
  });
  console.log("@insertPostingsData - After Mapping");

  // Update the new, unique teams in the db to include the company_id
  console.log("@insertPostingsData - Before @updateTeams");
  try {
    await updateTeams(newTeams);
  } catch (error) {
    console.log("ERROR -- @updateTeams: ", error);
    throw new Error("Error:" + error);
  }
  console.log("@insertPostingsData - After @updateTeams");
  console.log("@insertPostingsData - Number of New Teams Updated: ", newTeams.length, "\n\n");

  // For the new company_id's, add associate them to the search_id
  const uniqueCompanyIds = newCompanies.map((c) => c.companyId);

  console.log("@insertPostingsData - Before: @populateSearchCompanyRecords");
  try {
    await populateSearchCompanyRecords(searchId, uniqueCompanyIds);
  } catch (error) {
    console.log("ERROR -- @populateSearchCompanyRecords: ", error);
    throw new Error("Error:" + error);
  }
  console.log("@insertPostingsData - After: @populateSearchCompanyRecords \n\n");

  // Add the new postings; returns only newly added to db
  console.log("@insertPostingsData - Before: @createTeamsHashMap");
  const teamsMap = createTeamsHashMap(allTeams);
  console.log("@insertPostingsData - After: @createTeamsHashMap \n\n");

  console.log("@insertPostingsData - Before: @populateJobPostings");
  let uniquePostings;
  try {
    uniquePostings = await populateJobPostings(teamsMap, rawPostings, "Glassdoor");
  } catch (error) {
    console.log("ERROR -- @populateJobPostings: ", error);
    throw new Error("Error:" + error);
  }
  console.log("@insertPostingsData - After: @populateJobPostings");
  console.log("@insertPostingsData - Number of Unique Postings Inserted: ", uniquePostings.length, "\n\n");

  const uniquePostingIds = uniquePostings.map((v) => v.postingId);

  console.log("@insertPostingsData - Before: @populateSearchPostingRecords");
  try {
    await populateSearchPostingRecords(searchId, uniquePostingIds);
  } catch (error) {
    console.log("ERROR -- @populateSearchPostingRecords: ", error);
    throw new Error("Error:" + error);
  }
  console.log("@insertPostingsData - After: @populateSearchPostingRecords \n\n");

  console.log("******************** End of @insertPostingData ********************\n\n\n");

  client.release();
}
