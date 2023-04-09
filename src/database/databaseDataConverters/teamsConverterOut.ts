import { ITeam } from "@/types/appInterfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function teamsConverterOut(obj: any): ITeam {
  return {
    teamId: obj.team_id,
    teamName: obj.team_name,
    companyId: obj.company_id,
  };
}
