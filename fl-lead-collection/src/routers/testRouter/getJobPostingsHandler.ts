import { Request, Response } from "express";
import getGlassdoorJobPostingsDetailedData from "@/searches/Glassdoor/scripts/getGlassdoorJobPostingsDetailedData";

export default async function getJobPostingsHandler(req: Request, res: Response) {
  const { searchId } = req.body;
  try {
    const jobPostings = await getGlassdoorJobPostingsDetailedData(searchId);
    res.status(200).send(jobPostings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}
