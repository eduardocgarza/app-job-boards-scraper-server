import { ITeam, ITeamHashMap } from "@/types/appInterfaces";

export default function createTeamsHashMap(uniqueTeams: ITeam[]): ITeamHashMap {
  const hashMap: ITeamHashMap = {};
  for (const team of uniqueTeams) {
    hashMap[team.teamName] = team;
  }
  return hashMap;
}
