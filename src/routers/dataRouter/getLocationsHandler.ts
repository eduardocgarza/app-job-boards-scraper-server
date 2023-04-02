import { LOCATIONS } from "@/searches/Glassdoor/glassdoorConstants";
import { Request, Response } from "express";

export default async function getLocationsHandler(_: Request, res: Response) {
  return res.json(LOCATIONS);
}
