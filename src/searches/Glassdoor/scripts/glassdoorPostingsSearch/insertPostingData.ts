import { pool } from "@/database/databaseConfiguration";
import { IRawJobPosting } from "@/types/appInterfaces";
import createTeamsHashMap from "@/database/helpers/createTeamsHashMap";
import populateJobPostings from "@/database/testDatabase/testPopulateDatabase/populateJobPostings";
import insertTeams from "@/database/databaseActions/insertTeams";
import { insertCompanies } from "@/database/databaseActions/insertCompanies";
import { ICompanyObject } from "@/database/databaseDataConverters/companyConverterOut";
import updateTeams from "@/database/databaseActions/updateTeams";
import populateSearchPostingRecords from "@/database/testDatabase/testPopulateDatabase/populateSearchPostingRecords";
import populateSearchCompanyRecords from "@/database/testDatabase/testPopulateDatabase/populateSearchCompanyRecords";
import { getUniqueTeamNames } from "@/database/testDatabase/testPopulateDatabase/testPopulateDatabase";

export default async function insertPostingsData(
  searchId: string,
  rawPostings: IRawJobPosting[],
) {
  const client = await pool.connect();
  try {
    console.log("---------------- Start of Loop ------------------");
    console.log("Number of Raw Postings -- ", rawPostings.length);

    // Get unique teams from job postings page results
    const uniqueTeams = getUniqueTeamNames(rawPostings);
    console.log("Unique Teams", uniqueTeams);
    console.log("--------------------------------------\n\n\n");

    // Add unique teams to db; returns unique teams not previously in db

    console.log("** Before @populateTeams");
    const { allTeams, newTeams } = await insertTeams(uniqueTeams);
    console.log("** After @populateTeams \n\n");
    console.log("New Teams: ", newTeams);
    console.log("--------------------------------------\n\n\n");

    // Add same number of new companies to db as newTeams lengths

    console.log("** Before @populateCompanies");
    const newCompanies: ICompanyObject[] = await insertCompanies(newTeams.length);
    console.log("** After @populateCompanies \n\n");
    console.log("New Companies: ", newCompanies);
    console.log("--------------------------------------\n\n\n");

    // Associate the new companies from db with the new, unique teams
    newCompanies.forEach((company, index) => {
      newTeams[index].companyId = company.companyId;
      allTeams[index].companyId = company.companyId;
    });

    // Update the new, unique teams in the db to include the company_id

    console.log("** Before @updateTeams");
    await updateTeams(newTeams);
    console.log("** After @updateTeams \n\n");

    // For the new company_id's, add associate them to the search_id
    const uniqueCompanyIds = newCompanies.map((c) => c.companyId);
    console.log("uniqueCompanyIds -- ", uniqueCompanyIds);
    console.log("--------------------------------------\n\n\n");

    console.log("** Before @populateSearchCompanyRecords");
    await populateSearchCompanyRecords(searchId, uniqueCompanyIds);
    console.log("** After @populateSearchCompanyRecords \n\n");

    // Add the new postings; returns only newly added to db
    console.log("** Before @createTeamsHashMap");
    const teamsMap = createTeamsHashMap(allTeams);
    console.log("** After @createTeamsHashMap");
    console.log("teamsMap -- ", teamsMap);
    console.log("--------------------------------------\n\n\n");

    console.log("** Before @populateJobPostings");
    const uniquePostings = await populateJobPostings(teamsMap, rawPostings);
    console.log("** After @populateJobPostings \n\n");
    console.log("uniquePostings -- ", uniquePostings);
    console.log("--------------------------------------\n\n\n");

    const uniquePostingIds = uniquePostings.map((v) => v.postingId);
    console.log("uniquePostingIds -- ", uniquePostingIds);
    console.log("--------------------------------------\n\n\n");

    console.log("** Before @populateSearchPostingRecords");
    await populateSearchPostingRecords(searchId, uniquePostingIds);
    console.log("** After @populateSearchPostingRecords \n\n");
    console.log("populateSearchPostingRecords -- ", uniquePostingIds);
    console.log("--------------------------------------\n\n\n");

    console.log("---------------- End of Loop ------------------");
  } catch (error) {
    throw new Error(":: Insert Posting Data - @insertPostingData.ts -- " + error);
  } finally {
    client.release();
  }
}
