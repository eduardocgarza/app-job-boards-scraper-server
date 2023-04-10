import { Response } from "express";
import { searchSchema } from "../validators/searchValidation";
import { ISearchRequest } from "@/types/requestInterfaces";

export default async function nextStageSearchHandler(req: ISearchRequest, res: Response) {
  const { error } = searchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { searchId } = req.body;
  return res.json({ searchId });
}
