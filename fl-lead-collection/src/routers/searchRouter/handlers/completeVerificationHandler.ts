import { ISearchRequest } from "@/types/requestInterfaces";
import { Response } from "express";
import { searchSchema } from "../validators/searchValidation";
import updateSearchStatus from "@/database/databaseActions/updateSearchStatus";
import { DB_SEARCH_STATUSES } from "@/appConstants";

const searchNumber = 5;
const searchIndex = searchNumber - 1;
const searchStatus = DB_SEARCH_STATUSES[searchIndex].statusId;

export default async function completeVerificationHandler(
  req: ISearchRequest,
  res: Response,
) {
  const { error } = searchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { searchId } = req.body;
  const searchObject = await updateSearchStatus(searchId, searchStatus);
  return res.json(searchObject);
}
