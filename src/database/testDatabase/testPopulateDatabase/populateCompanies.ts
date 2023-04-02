import { insertCompaniesFromTeams } from "@/database/databaseActions/insertCompanies";
import { IRawJobPosting } from "@/types/appInterfaces";
import { getUniqueTeamNames } from "./testPopulateDatabase";

export default async function populateCompanies(jobPostings: IRawJobPosting[]) {
  const uniqueTeams = getUniqueTeamNames(jobPostings);
  return await insertCompaniesFromTeams(uniqueTeams);
}
