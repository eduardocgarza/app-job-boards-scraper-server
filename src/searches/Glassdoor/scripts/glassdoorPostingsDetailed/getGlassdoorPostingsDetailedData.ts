import PuppBrowser from "@/helpers/PuppBrowser";
import glassdoorGetPostingIds from "./glassdoorGetPostingIds";
import getSinglePostingDetails from "./getSinglePostingDetails";
import { IExecuteSearchObject } from "@/types/appInterfaces";

export interface IPostingDetailsInput {
  postingId: string;
  postingURL: string;
  companyId: string;
}

export default async function getGlassdoorPostingsDetailedData(
  searchObject: IExecuteSearchObject,
) {
  const { searchId } = searchObject;
  const jobPostings: IPostingDetailsInput[] = await glassdoorGetPostingIds(searchId);
  const { page, closeBrowser } = await PuppBrowser();
  try {
    for (const jobPostingItem of jobPostings) {
      const { postingId, postingURL, companyId } = jobPostingItem;
      await page.goto(postingURL, { waitUntil: "networkidle0" });
      await getSinglePostingDetails(page, companyId, postingId);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await closeBrowser();
  }
}
