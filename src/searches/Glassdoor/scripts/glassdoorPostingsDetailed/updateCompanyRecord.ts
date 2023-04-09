import { pool } from "@/database/databaseConfiguration";
import { companiesTable } from "@/database/dbConstants";
import { ICompanyDetailsInput } from "@/types/appInterfaces";

export default async function updateCompanyRecord(companyDetails: ICompanyDetailsInput) {
  const query = `
    UPDATE ${companiesTable}
    SET 
      company_name = $1,
      company_profile_url = $2,
      company_username = $3,
      headquarters_location = $4
    WHERE 
      company_id = $5;
  `;
  const client = await pool.connect();
  try {
    await client.query(query, [
      companyDetails.companyName,
      companyDetails.companyProfileURL,
      companyDetails.companyUsername,
      companyDetails.headquartersLocation,
      companyDetails.companyId,
    ]);
    console.log("-- Updated CompanyRecord -- ID: ", companyDetails.companyId, " and URL :", companyDetails.companyProfileURL);
  } catch (error) {
    throw new Error("Failed to updateCompanyRecord: " + error);
  } finally {
    client.release();
  }
}
