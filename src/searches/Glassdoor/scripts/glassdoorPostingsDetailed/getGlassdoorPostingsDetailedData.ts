import PuppBrowser from "@/helpers/PuppBrowser";
import glassdoorGetPostingsData from "./glassdoorGetPostingsData";
import getSinglePostingDetails from "./getSinglePostingDetails";
import { IExecuteSearchObject } from "@/types/appInterfaces";
import fs from "fs";

export interface IPostingDetailsInput {
  postingId: string;
  postingURL: string;
  companyId: string;
}

export default async function getGlassdoorPostingsDetailedData(
  searchObject: IExecuteSearchObject,
) {
  const { searchId } = searchObject;
  const jobPostings: IPostingDetailsInput[] = await glassdoorGetPostingsData(searchId);

  const { page, closeBrowser } = await PuppBrowser();
  try {
    for (const jobPostingItem of jobPostings) {
      console.log("**************************************************");
      console.log(`=== Start ${jobPostingItem.postingId}`);
      const { postingId, postingURL, companyId } = jobPostingItem;
      await page.goto(postingURL, { waitUntil: "networkidle0" });
      await getSinglePostingDetails(page, companyId, postingId);
      console.log(`=== End ${jobPostingItem.postingId}`);
      console.log("**************************************************");
      console.log("\n\n\n");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await closeBrowser();
  }
}
