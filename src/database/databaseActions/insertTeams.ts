import { IRawTeam } from "@/types/appInterfaces";
import { pool } from "../databaseConfiguration";
import { teamsTable } from "../dbConstants";
import teamsConverterOut from "../databaseDataConverters/teamsConverterOut";

type TTeamsValues = Array<string>[];

function createValuesMap(values: TTeamsValues) {
  return values.map((_, i) => `($${2 * i + 1}, $${2 * i + 2})`).join(",");
}

export default async function insertTeams(teams: IRawTeam[]) {
  const values: TTeamsValues = teams.map(({ teamName, companyId }) => [
    teamName,
    companyId,
  ]);
  const query = `
    INSERT INTO ${teamsTable} 
      (team_name, company_id)
    VALUES ${createValuesMap(values)}
    ON CONFLICT 
      (team_name) 
    DO UPDATE SET 
      team_name = excluded.team_name,
      company_id = excluded.company_id
    RETURNING *
  `;
  const { rows } = await pool.query(query, values.flat());
  return rows.map(teamsConverterOut);
}
