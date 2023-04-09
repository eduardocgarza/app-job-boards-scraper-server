import { IExecuteSearchObject } from "@/types/appInterfaces";
import { pool } from "../databaseConfiguration";
import { searchesTable } from "../dbConstants";
import searchConverterOut from "../databaseDataConverters/searchConverterOut";

export default async function getSearchObject(searchId: string): Promise<IExecuteSearchObject> {
  const client = await pool.connect();
  try {
    const query = `
      SELECT * 
      FROM ${searchesTable}
      WHERE search_id = $1;
    `;
    const result = await client.query(query, [searchId]);
    const searchObject = result.rows[0];
    return searchConverterOut(searchObject);
  } catch (e) {
    throw new Error("searchId not found in searches");
  } finally {
    client.release();
  }
}
