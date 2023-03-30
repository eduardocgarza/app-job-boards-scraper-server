import { pool } from "@/database/databaseConfiguration";
import getSearchCompanies from "./getSearchCompanies";
import getSearchPostings from "./getSearchPostings";
import { ISearchInsertData } from "../../config/airtableInterfaces";

export default async function getSearchData(
  searchId: string,
): Promise<ISearchInsertData> {
  const client = await pool.connect();
  try {
    const companies = await getSearchCompanies(client, searchId);
    const postings = await getSearchPostings(client, searchId);
    return { companies, postings };
  } finally {
    client.release();
  }
}
