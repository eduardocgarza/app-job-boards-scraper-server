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

export default async function getGlassdoorPostingsDetailedData(searchObject: IExecuteSearchObject) {
  const { searchId } = searchObject;
  const jobPostings: IPostingDetailsInput[] = await glassdoorGetPostingsData(searchId);
  console.log("Number of Items: ", jobPostings.length);

  const { page, closeBrowser } = await PuppBrowser();
  try {
    for (const [index, jobPostingItem] of Object.entries(jobPostings)) {
      console.log("********** Starting Loop Detailed Data **********");
      console.log(`Index: ${index} of ${jobPostings.length}`);
      console.log(`@LoopStart:: Posting ID: ${jobPostingItem.postingId}`);

      const { postingId, postingURL, companyId } = jobPostingItem;
      await page.goto(postingURL, { waitUntil: "domcontentloaded" });
      console.log("@Loop:: Done Waiting.");

      console.log("@Loop - Start @getSinglePostingDetails");
      await getSinglePostingDetails(page, companyId, postingId);
      console.log("@Loop - End @getSinglePostingDetails");

      console.log(`@Loop:: End Start Posting ID: ${jobPostingItem.postingId}`);
      console.log("********** Ending Loop Detailed Data **********\n\n\n");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await closeBrowser();
  }
}
