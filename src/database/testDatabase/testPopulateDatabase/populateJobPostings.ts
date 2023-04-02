import insertPostings from "@/database/databaseActions/insertPostings";
import { ITeamHashMap, IPreStoreJobPosting, IRawJobPosting } from "@/types/appInterfaces";

function createFormattedPostings(
  hashMap: ITeamHashMap,
  postings: IRawJobPosting[],
): IPreStoreJobPosting[] {
  return postings.map((posting) => ({
    ...posting,
    companyId: hashMap[posting.teamName].companyId,
    teamId: hashMap[posting.teamName].teamId,
  }));
}

export default async function populateJobPostings(
  hashMap: ITeamHashMap,
  rawPostings: IRawJobPosting[],
) {
  const formattedPostings = createFormattedPostings(hashMap, rawPostings);
  return await insertPostings(formattedPostings);
}