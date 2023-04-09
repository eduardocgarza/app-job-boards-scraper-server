import { pool } from "../databaseConfiguration";

export default async function getJobPosting(postingId: string) {
  console.log("postingId:", postingId);
  const client = await pool.connect();
  try {
    return [];
  } catch (error) {
    console.log("Error getting job postings:", error);
    return [];
  } finally {
    client.release();
  }
}
