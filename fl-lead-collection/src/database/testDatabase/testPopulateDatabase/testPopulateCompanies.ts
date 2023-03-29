import insertCompanies from "@/database/databaseActions/insertCompanies";
import { ICompany, ICompanyHashMap, IRawJobPosting } from "@/types/appInterfaces";

function getUniqueCompanyNames(jobPostings: IRawJobPosting[]): string[] {
  const uniqueCompanyNames: string[] = [];
  jobPostings.forEach((company) => {
    if (!uniqueCompanyNames.includes(company.companyName)) {
      uniqueCompanyNames.push(company.companyName);
    }
  });
  return uniqueCompanyNames;
}

export default async function testPopulateCompanies(jobPostings: IRawJobPosting[]) {
  const uniqueCompanies = getUniqueCompanyNames(jobPostings);
  return await insertCompanies(uniqueCompanies);
}
