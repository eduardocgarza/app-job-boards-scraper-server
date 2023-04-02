import { SEARCH_ROLES } from "@/searches/Glassdoor/glassdoorConstants";
import { Request, Response } from "express";

export default async function getRolesHandler(_: Request, res: Response) {
  return res.json(SEARCH_ROLES);
}
