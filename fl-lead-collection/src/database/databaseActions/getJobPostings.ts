import { pool } from "../databaseConfiguration";

export default async function getJobPostings(searchId: string) {
  const client = await pool.connect();
  console.log("searchId:", searchId);
  try {
    // await client.query("");
    return [];
  } catch (error) {
    console.log("Error getting job postings:", error);
    return [];
  } finally {
    client.release();
  }
}
