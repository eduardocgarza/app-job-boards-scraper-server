import { ICompany, IRawJobPosting, IRawTeam, ITeam } from "@/types/appInterfaces";
import { getUniqueTeamNames } from "./testPopulateDatabase";
import insertTeams from "@/database/databaseActions/insertTeams";

function createTeamsObject(uniqueTeams: string[], companies: ICompany[]) {
  return uniqueTeams.map((teamName, index) => ({
    teamName,
    companyId: companies[index].companyId,
  }));
}

export default async function populateTeams(
  postings: IRawJobPosting[],
  companies: ICompany[],
): Promise<ITeam[]> {
  const uniqueTeams = getUniqueTeamNames(postings);
  const teamObjects: IRawTeam[] = createTeamsObject(uniqueTeams, companies);
  const teams = await insertTeams(teamObjects);
  return teams;
}
