import updateSearchStatus from "@/database/databaseActions/updateSearchStatus";
import { Response } from "express";
import { DB_SEARCH_STATUSES } from "@/appConstants";
import { ISearchRequest } from "@/types/requestInterfaces";
import {} from "../validators/searchValidation";

export default async function startPeopleSearchHandler(
  req: ISearchRequest,
  res: Response,
) {}
