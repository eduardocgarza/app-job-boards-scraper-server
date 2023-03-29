import insertPostings from "@/database/databaseActions/insertPostings";
import { ICompanyHashMap, IPreStoreJobPosting, IRawJobPosting } from "@/types/appInterfaces";

function createFormattedPostings(
  hashMap: ICompanyHashMap,
  postings: IRawJobPosting[],
): IPreStoreJobPosting[] {
  return postings.map((posting) => ({
    ...posting,
    companyId: hashMap[posting.companyName].companyId,
  }));
}

export default async function testPopulateJobPostings(
  hashMap: ICompanyHashMap,
  rawPostings: IRawJobPosting[],
) {
  const formattedPostings: IPreStoreJobPosting[] = createFormattedPostings(hashMap, rawPostings);
  return await insertPostings(formattedPostings);
}
