import { IRawTeam, ITeam } from "@/types/appInterfaces";
import { pool } from "../databaseConfiguration";
import { DB_TABLE_NAMES } from "../dbConstants";

type TTeamsValues = Array<string>[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToCamelCase(obj: any): ITeam {
  return {
    teamId: obj.team_id,
    teamName: obj.team_name,
    companyId: obj.company_id,
  };
}

function createValuesMap(values: TTeamsValues) {
  return values.map((_, i) => `($${2 * i + 1}, $${2 * i + 2})`).join(",");
}

export default async function insertTeams(teams: IRawTeam[]) {
  const values: TTeamsValues = teams.map(({ teamName, companyId }) => [
    teamName,
    companyId,
  ]);
  const query = `
    INSERT INTO ${DB_TABLE_NAMES.teamsTable} 
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
  return rows.map(convertToCamelCase);
}
