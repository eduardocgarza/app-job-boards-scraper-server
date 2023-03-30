import { pool } from "@/database/databaseConfiguration";
import { DB_TABLE_NAMES } from "@/database/dbConstants";
import { ICompanyDetailsInput } from "@/types/appInterfaces";

export default async function updateCompanyRecord(companyDetails: ICompanyDetailsInput) {
  const { companyName, companyProfileURL, companyUsername, hqLocation, companyId } =
    companyDetails;
  const query = `
    UPDATE ${DB_TABLE_NAMES.companiesTable}
    SET 
      company_name = $1,
      company_profile_url = $2,
      company_username = $3,
      headquarters_location = $4
    WHERE 
      company_id = $5
  `;
  await pool.query(query, [
    companyName,
    companyProfileURL,
    companyUsername,
    hqLocation,
    companyId,
  ]);
}
