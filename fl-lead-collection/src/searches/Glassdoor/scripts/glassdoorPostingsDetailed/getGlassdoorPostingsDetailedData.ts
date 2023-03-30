import PuppBrowser from "@/helpers/PuppBrowser";
import glassdoorGetPostingIds from "./glassdoorGetPostingIds";
import getSinglePostingDetails from "./getSinglePostingDetails";

export interface IPostingDetailsInput {
  postingId: string;
  postingURL: string;
  companyId: string;
}

export default async function getGlassdoorPostingsDetailedData(searchId: string) {
  console.log("Starting @getGlassdoorPostingsDetailedData()");
  const jobPostings: IPostingDetailsInput[] = await glassdoorGetPostingIds(searchId);
  const { page, closeBrowser } = await PuppBrowser();
  try {
    for (const [index, jobPostingItem] of jobPostings.entries()) {
      const { postingId, postingURL, companyId } = jobPostingItem;
      await page.goto(postingURL, { waitUntil: "networkidle0" });
      await getSinglePostingDetails(page, companyId, postingId);
      console.log(`Completed ${postingId} -- Item ${index + 1} of ${jobPostings.length}`);
    }
    console.log("Finished @getGlassdoorPostingsDetailedData()");
  } catch (error) {
    console.error(error);
  } finally {
    await closeBrowser();
  }
}
