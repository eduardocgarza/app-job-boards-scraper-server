import getGlassdoorPostingsDetailedData from "@/searches/Glassdoor/scripts/glassdoorPostingsDetailed/getGlassdoorPostingsDetailedData";
import { Request, Response } from "express";

export default async function getJobPostingsHandler(req: Request, res: Response) {
  const { searchId } = req.body;
  try {
    const jobPostings = await getGlassdoorPostingsDetailedData(searchId);
    res.status(200).send(jobPostings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}
