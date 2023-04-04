// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function teamsConverterOut(obj: any) {
  return {
    teamId: obj.team_id,
    teamName: obj.team_name,
    companyId: obj.company_id,
  };
}
