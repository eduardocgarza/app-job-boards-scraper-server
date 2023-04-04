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
      company_id = $5 AND company_name IS NULL;
  `;
  await pool.query(query, [
    companyDetails.companyName,
    companyDetails.companyProfileURL,
    companyDetails.companyUsername,
    companyDetails.headquartersLocation,
    companyDetails.companyId,
  ]);
}
