import { ITeam } from "@/types/appInterfaces";
import { pool } from "../databaseConfiguration";
import { teamsTable } from "../dbConstants";

export default async function updateTeams(teams: ITeam[]) {
  if (!teams.length) return;
  const client = await pool.connect();
  for (const team of teams) {
    try {
      const { teamId, companyId } = team;
      const query = `
        UPDATE ${teamsTable}
        SET company_id = $2
        WHERE team_id = $1;
      `;
      const values = [teamId, companyId];
      await client.query(query, values);
    } catch (error) {
      throw new Error("Failed to updateTeams: " + error);
    }
  }
  client.release();
}
