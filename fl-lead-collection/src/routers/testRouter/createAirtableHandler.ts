import createSearchAirtables from "@/integrations/airtable/actions/createSearchAirtables/createSearchAirtables";
import { ISearchAirtableIds } from "@/integrations/airtable/config/airtableInterfaces";
import { Request, Response } from "express";

const { AIRTABLE_FL_BASE_ID } = process.env;

function convertAirtableIdsToURL(airtableIds: ISearchAirtableIds) {
  const { companiesAirtableId, postingsAirtableId } = airtableIds;
  const { airtableId: companyAirtalbeId } = companiesAirtableId;
  const { airtableId: postingAirtableId } = postingsAirtableId;
  const companyAirtableURL = `https://airtable.com/${AIRTABLE_FL_BASE_ID}/${companyAirtalbeId}`;
  const postingAirtableURL = `https://airtable.com/${AIRTABLE_FL_BASE_ID}/${postingAirtableId}`;
  return { companyAirtableURL, postingAirtableURL };
}

export default async function createAirtableHandler(req: Request, res: Response) {
  const airtableIds = await createSearchAirtables("10");
  return res.send(convertAirtableIdsToURL(airtableIds));
}
