import updateSearchStatus from "@/database/databaseActions/updateSearchStatus";
import { Response } from "express";
import { DB_SEARCH_STATUSES } from "@/appConstants";
import { ISearchRequest } from "@/types/requestInterfaces";
import { searchSchema } from "../validators/searchValidation";

const searchNumber = 3;
const searchIndex = searchNumber - 1;
const searchStatus = DB_SEARCH_STATUSES[searchIndex].statusId;

export default async function jobsSearchCompleteNextHandler(
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
