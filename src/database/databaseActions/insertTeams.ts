import { pool } from "../databaseConfiguration";
import { teamsTable } from "../dbConstants";
import teamsConverterOut from "../databaseDataConverters/teamsConverterOut";

export default async function insertTeams(teams: string[]) {
  const client = await pool.connect();

  const values = teams.map((_, index) => `($${index + 1})`).join(",");
  const insertQuery = `
    INSERT INTO ${teamsTable} (team_name)
    SELECT DISTINCT team_name FROM (VALUES ${values}) AS v(team_name)
    ON CONFLICT (team_name) DO NOTHING
    RETURNING team_id, team_name;
  `;
  const params = [...teams];

  try {
    const newTeamsResponse = await client.query(insertQuery, params);
    const newTeams = newTeamsResponse.rows.map(teamsConverterOut);

    const placeholders = teams.map((_, i) => `$${i + 1}`).join(",");
    const query = `
      SELECT * FROM ${teamsTable}
      WHERE team_name IN (${placeholders});
    `;
    const allTeamsResponse = await pool.query(query, teams);
    const allTeams = allTeamsResponse.rows.map(teamsConverterOut);

    return { allTeams, newTeams };
  } catch (error) {
    throw new Error("Error inside insertTeams: " + error);
  } finally {
    client.release();
  }
}
